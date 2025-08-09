import { NextRequest, NextResponse } from 'next/server';
import { createInquiry, type InquiryInsert } from '@/lib/supabase';
import { 
  sendParentConfirmation, 
  sendStaffNotification,
  sendParentConfirmationMultiple,
  sendStaffNotificationMultiple 
} from '@/lib/email';
import { inquiryRateLimiter, withRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  return withRateLimit(request, inquiryRateLimiter, async () => {
    try {
      const data = await request.json();
    
    // Check if this is the new format with children array
    const hasChildrenArray = data.children && Array.isArray(data.children);
    
    // Validate required parent fields
    const requiredParentFields = ['parentName', 'email', 'phone', 'relationship'];
    for (const field of requiredParentFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Generate unique inquiry group ID (for multiple children)
    const inquiryGroupId = `INQ-${Date.now()}`;
    const savedInquiries = [];
    
    if (hasChildrenArray) {
      // New format with multiple children
      if (data.children.length === 0) {
        return NextResponse.json(
          { error: 'At least one child must be included' },
          { status: 400 }
        );
      }
      
      // Validate and save each child
      for (let i = 0; i < data.children.length; i++) {
        const child = data.children[i];
        
        // Validate required child fields
        if (!child.childName || !child.dateOfBirth || !child.program) {
          return NextResponse.json(
            { error: `Missing required field for child ${i + 1}` },
            { status: 400 }
          );
        }
        
        // Prepare data for database
        const inquiryData: InquiryInsert = {
          parent_name: data.parentName,
          email: data.email,
          phone: data.phone,
          relationship: data.relationship,
          child_name: child.childName,
          date_of_birth: child.dateOfBirth,
          program: child.program,
          special_needs: child.specialNeeds || null,
          previous_school: child.previousSchool || null,
          preferred_start_date: data.preferredStartDate || null,
          how_heard: data.howHeard || null,
          message: data.message || null,
          inquiry_id: `${inquiryGroupId}-${i + 1}`,
          status: 'new'
        };
        
        // Save to database
        const savedInquiry = await createInquiry(inquiryData);
        savedInquiries.push(savedInquiry);
        
        console.log(`New inquiry saved for child ${i + 1}:`, {
          id: savedInquiry.id,
          inquiryId: savedInquiry.inquiry_id,
          parentName: savedInquiry.parent_name,
          email: savedInquiry.email,
          childName: savedInquiry.child_name,
          program: savedInquiry.program,
          timestamp: savedInquiry.created_at
        });
      }
    } else {
      // Old format with single child (backward compatibility)
      const requiredChildFields = ['childName', 'dateOfBirth', 'program'];
      for (const field of requiredChildFields) {
        if (!data[field]) {
          return NextResponse.json(
            { error: `Missing required field: ${field}` },
            { status: 400 }
          );
        }
      }
      
      // Prepare data for database
      const inquiryData: InquiryInsert = {
        parent_name: data.parentName,
        email: data.email,
        phone: data.phone,
        relationship: data.relationship,
        child_name: data.childName,
        date_of_birth: data.dateOfBirth,
        program: data.program,
        special_needs: data.specialNeeds || null,
        previous_school: data.previousSchool || null,
        preferred_start_date: data.preferredStartDate || null,
        how_heard: data.howHeard || null,
        message: data.message || null,
        inquiry_id: inquiryGroupId,
        status: 'new'
      };
      
      // Save to database
      const savedInquiry = await createInquiry(inquiryData);
      savedInquiries.push(savedInquiry);
      
      console.log('New inquiry saved to database:', {
        id: savedInquiry.id,
        inquiryId: savedInquiry.inquiry_id,
        parentName: savedInquiry.parent_name,
        email: savedInquiry.email,
        childName: savedInquiry.child_name,
        program: savedInquiry.program,
        timestamp: savedInquiry.created_at
      });
    }
    
    // Send emails and wait for them to complete
    // For multiple children, we'll send one email with all children info
    let emailsSent = { parent: false, staff: false };
    
    try {
      if (hasChildrenArray && savedInquiries.length > 1) {
        const [parentResult, staffResult] = await Promise.all([
          sendParentConfirmationMultiple(savedInquiries).catch(err => {
            console.error('Failed to send parent confirmation email:', err);
            return false;
          }),
          sendStaffNotificationMultiple(savedInquiries).catch(err => {
            console.error('Failed to send staff notification email:', err);
            return false;
          })
        ]);
        emailsSent = { parent: parentResult, staff: staffResult };
      } else {
        // Single child email (existing functionality)
        const [parentResult, staffResult] = await Promise.all([
          sendParentConfirmation(savedInquiries[0]).catch(err => {
            console.error('Failed to send parent confirmation email:', err);
            return false;
          }),
          sendStaffNotification(savedInquiries[0]).catch(err => {
            console.error('Failed to send staff notification email:', err);
            return false;
          })
        ]);
        emailsSent = { parent: parentResult, staff: staffResult };
      }
      
      // Log email sending results
      console.log('Email sending results:', emailsSent);
      
      // Warn if emails failed but don't fail the whole request
      if (!emailsSent.parent) {
        console.warn('Parent confirmation email was not sent successfully');
      }
      if (!emailsSent.staff) {
        console.warn('Staff notification email was not sent successfully');
      }
    } catch (emailError) {
      console.error('Error during email sending:', emailError);
      // Continue even if emails fail - the inquiry is already saved
    }
    
    // Return success response with email status
    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: inquiryGroupId,
      childrenCount: savedInquiries.length,
      emailStatus: {
        parentConfirmation: emailsSent.parent,
        staffNotification: emailsSent.staff,
        message: emailsSent.parent && emailsSent.staff 
          ? 'Confirmation emails have been sent successfully'
          : emailsSent.parent 
          ? 'Confirmation email sent to parent'
          : 'Your inquiry has been saved. We will contact you soon.'
      }
    });
    
  } catch (error) {
    console.error('Error processing inquiry:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      // Database-related errors
      if (error.message.includes('duplicate') || error.message.includes('unique')) {
        return NextResponse.json(
          { error: 'An inquiry with this information already exists' },
          { status: 409 }
        );
      }
      
      // Connection errors
      if (error.message.includes('connect') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Unable to connect to the database. Please try again later.' },
          { status: 503 }
        );
      }
    }
    
    // Generic error response
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again.' },
      { status: 500 }
    );
    }
  });
}