import { NextRequest, NextResponse } from 'next/server';
import { createInquiry, type InquiryInsert } from '@/lib/supabase';
import { sendParentConfirmation, sendStaffNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['parentName', 'email', 'phone', 'relationship', 'childName', 'dateOfBirth', 'program'];
    for (const field of requiredFields) {
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
    
    // Generate unique inquiry ID
    const inquiryId = `INQ-${Date.now()}`;
    
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
      inquiry_id: inquiryId,
      status: 'new'
    };
    
    // Save to database
    const savedInquiry = await createInquiry(inquiryData);
    
    console.log('New inquiry saved to database:', {
      id: savedInquiry.id,
      inquiryId: savedInquiry.inquiry_id,
      parentName: savedInquiry.parent_name,
      email: savedInquiry.email,
      childName: savedInquiry.child_name,
      program: savedInquiry.program,
      timestamp: savedInquiry.created_at
    });
    
    // Send emails asynchronously (don't wait for them to complete)
    Promise.all([
      sendParentConfirmation(savedInquiry).catch(err => {
        console.error('Failed to send parent confirmation email:', err);
      }),
      sendStaffNotification(savedInquiry).catch(err => {
        console.error('Failed to send staff notification email:', err);
      })
    ]);
    
    // Return success response immediately
    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: savedInquiry.inquiry_id
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
}