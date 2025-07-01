import { Resend } from "resend";
import { type Inquiry, type InformationRequest } from "./supabase";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.EMAIL_FROM || "";
const STAFF_EMAIL = process.env.STAFF_EMAIL || "";
const STAFF_PHONE = process.env.STAFF_PHONE || "";
const SCHOOL_NAME = "Wonderland Early Years & Prep School";

// Email template for parent confirmation
export function getParentConfirmationTemplate(inquiry: Inquiry): string {
  const programNames: Record<string, string> = {
    nursery: "Nursery (Ages 2-3)",
    "pre-k": "Pre-K (Ages 3-4)",
    kindergarten: "Kindergarten (Ages 4-6)",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - ${SCHOOL_NAME}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #ff6b6b; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .info-box { background-color: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #4ecdc4; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    h1 { margin: 0; }
    h2 { color: #ff6b6b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Application Received!</h1>
    </div>
    <div class="content">
      <p>Dear ${inquiry.parent_name},</p>
      
      <p>Thank you for your interest in <strong>${SCHOOL_NAME}</strong>. We're thrilled that you're considering us for ${inquiry.child_name}'s educational journey!</p>
      
      <p>We have successfully received your application and it is being reviewed by our admissions team.</p>
      
      <div class="info-box">
        <h3>Application Summary:</h3>
        <p><strong>Reference Number:</strong> ${inquiry.inquiry_id}</p>
        <p><strong>Child's Name:</strong> ${inquiry.child_name}</p>
        <p><strong>Program of Interest:</strong> ${programNames[inquiry.program] || inquiry.program}</p>
        <p><strong>Submitted On:</strong> ${new Date(
          inquiry.created_at || Date.now(),
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</p>
      </div>
      
      <h2>What Happens Next?</h2>
      <ol>
        <li><strong>Application Review:</strong> Our admissions team will carefully review your application within 2-3 business days.</li>
        <li><strong>School Tour:</strong> We'll contact you to schedule a personal tour of our facilities, if you'd like.</li>
        <li><strong>Meet & Greet:</strong> If a school tour is scheduled, you and ${inquiry.child_name} will have the opportunity to meet our teachers and see our classrooms in action.</li>
        <li><strong>Enrollment:</strong> Upon acceptance, we'll guide you through the enrollment process.</li>
      </ol>
      
      <p>If you have any questions in the meantime, please don't hesitate to contact us at:</p>
      <ul>
        <li>📧 Email: ${STAFF_EMAIL}</li>
        <li>📞 Phone: ${STAFF_PHONE}</li>
      </ul>
      
      <p>We look forward to welcoming ${inquiry.child_name} to our Wonderland family!</p>
      
      <p>Warm regards,<br>
      The Admissions Team<br>
      ${SCHOOL_NAME}</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${SCHOOL_NAME}. All rights reserved.</p>
      <p>This email was sent to ${inquiry.email} regarding application ${inquiry.inquiry_id}</p>
    </div>
  </div>
</body>
</html>
`;
}

// Email template for staff notification
export function getStaffNotificationTemplate(inquiry: Inquiry): string {
  const programNames: Record<string, string> = {
    nursery: "Nursery (Ages 2-3)",
    "pre-k": "Pre-K (Ages 3-4)",
    kindergarten: "Kindergarten (Ages 4-6)",
  };

  const relationshipNames: Record<string, string> = {
    mother: "Mother",
    father: "Father",
    guardian: "Guardian",
    other: "Other",
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - ${inquiry.inquiry_id}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 700px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4ecdc4; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background-color: #f9f9f9; padding: 30px; }
    .section { background-color: white; padding: 20px; margin: 15px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #666; }
    .value { color: #333; }
    .highlight { background-color: #ffe66d; padding: 2px 5px; border-radius: 3px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #4ecdc4; margin-top: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 New Inquiry Received</h1>
      <p style="margin: 5px 0;">Reference: ${inquiry.inquiry_id}</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Parent/Guardian Information</h2>
        <div class="field">
          <span class="label">Name:</span> <span class="value">${inquiry.parent_name}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span> <span class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></span>
        </div>
        <div class="field">
          <span class="label">Phone:</span> <span class="value">${inquiry.phone}</span>
        </div>
        <div class="field">
          <span class="label">Relationship:</span> <span class="value">${relationshipNames[inquiry.relationship] || inquiry.relationship}</span>
        </div>
      </div>

      <div class="section">
        <h2>Child Information</h2>
        <div class="field">
          <span class="label">Name:</span> <span class="value">${inquiry.child_name}</span>
        </div>
        <div class="field">
          <span class="label">Date of Birth:</span> <span class="value">${new Date(
            inquiry.date_of_birth,
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
        </div>
        <div class="field">
          <span class="label">Age:</span> <span class="value">${calculateAge(inquiry.date_of_birth)} years old</span>
        </div>
        <div class="field">
          <span class="label">Program Interest:</span> <span class="value highlight">${programNames[inquiry.program] || inquiry.program}</span>
        </div>
        ${
          inquiry.special_needs
            ? `
        <div class="field">
          <span class="label">Special Needs/Allergies:</span> <span class="value">${inquiry.special_needs}</span>
        </div>
        `
            : ""
        }
        ${
          inquiry.previous_school
            ? `
        <div class="field">
          <span class="label">Previous School:</span> <span class="value">${inquiry.previous_school}</span>
        </div>
        `
            : ""
        }
      </div>

      <div class="section">
        <h2>Additional Information</h2>
        ${
          inquiry.preferred_start_date
            ? `
        <div class="field">
          <span class="label">Preferred Start Date:</span> <span class="value">${new Date(
            inquiry.preferred_start_date,
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
        </div>
        `
            : ""
        }
        ${
          inquiry.how_heard
            ? `
        <div class="field">
          <span class="label">How They Heard About Us:</span> <span class="value">${inquiry.how_heard}</span>
        </div>
        `
            : ""
        }
        ${
          inquiry.message
            ? `
        <div class="field">
          <span class="label">Message/Questions:</span>
          <div class="value" style="margin-top: 5px; padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
            ${inquiry.message}
          </div>
        </div>
        `
            : ""
        }
      </div>

      <div class="section" style="background-color: #ffe66d;">
        <h2 style="color: #333;">Action Required</h2>
        <p>Please review this inquiry and contact the parent within 2-3 business days.</p>
        <p><strong>Quick Actions:</strong></p>
        <ul style="margin: 5px 0;">
          <li>Call ${inquiry.parent_name} at ${inquiry.phone}</li>
          <li>Send follow-up email to ${inquiry.email}</li>
          <li>Schedule a school tour</li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <p>Submitted on ${new Date(inquiry.created_at || Date.now()).toLocaleString("en-US")}</p>
      <p>This is an automated notification from the ${SCHOOL_NAME} inquiry system.</p>
    </div>
  </div>
</body>
</html>
`;
}

// Helper function to calculate age
function calculateAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Send confirmation email to parent
export async function sendParentConfirmation(
  inquiry: Inquiry,
): Promise<boolean> {
  try {
    const html = getParentConfirmationTemplate(inquiry);

    const data = await resend.emails.send({
      from: `${SCHOOL_NAME} <${FROM_EMAIL}>`,
      to: inquiry.email,
      subject: `Application Received - ${inquiry.child_name} | ${SCHOOL_NAME}`,
      html,
    });

    console.log("Parent confirmation email sent:", data);
    return true;
  } catch (error) {
    console.error("Error sending parent confirmation email:", error);
    return false;
  }
}

// Send notification email to staff
export async function sendStaffNotification(
  inquiry: Inquiry,
): Promise<boolean> {
  try {
    const html = getStaffNotificationTemplate(inquiry);

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: STAFF_EMAIL,
      subject: `New Inquiry: ${inquiry.child_name} - ${inquiry.program.toUpperCase()} Program`,
      html,
      replyTo: inquiry.email, // Allow staff to reply directly to the parent
    });

    console.log("Staff notification email sent:", data);
    return true;
  } catch (error) {
    console.error("Error sending staff notification email:", error);
    return false;
  }
}

// Email template for information request notifications
export function getInformationRequestTemplate(
  request: InformationRequest,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Information Request - ${request.request_id}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #ffe66d; color: #333; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background-color: #f9f9f9; padding: 30px; }
    .section { background-color: white; padding: 20px; margin: 15px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .field { margin: 10px 0; }
    .label { font-weight: bold; color: #666; }
    .value { color: #333; }
    .cta { background-color: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
    .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    h1 { margin: 0; font-size: 24px; }
    h2 { color: #ff6b6b; margin-top: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📚 New Information Request</h1>
      <p style="margin: 5px 0;">Reference: ${request.request_id}</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Contact Information</h2>
        <div class="field">
          <span class="label">Parent's Name:</span> <span class="value">${request.parent_name}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span> <span class="value"><a href="mailto:${request.email}">${request.email}</a></span>
        </div>
        <div class="field">
          <span class="label">Phone:</span> <span class="value">${request.phone}</span>
        </div>
        <div class="field">
          <span class="label">Child's Age:</span> <span class="value">${request.child_age}</span>
        </div>
      </div>

      ${
        request.message
          ? `
      <div class="section">
        <h2>Message</h2>
        <div class="value" style="padding: 10px; background-color: #f0f0f0; border-radius: 5px;">
          ${request.message}
        </div>
      </div>
      `
          : ""
      }

      <div class="section" style="background-color: #fff3cd; border-left: 4px solid #ffe66d;">
        <h2 style="color: #856404;">Quick Response Required</h2>
        <p>This parent is requesting information about ${SCHOOL_NAME}. Please respond within 24 hours.</p>
        <p><strong>Suggested Actions:</strong></p>
        <ul style="margin: 5px 0;">
          <li>Send information packet via email</li>
          <li>Call to discuss their needs</li>
          <li>Schedule a school tour</li>
        </ul>
        <a href="mailto:${request.email}" class="cta">Reply to ${request.parent_name}</a>
      </div>
    </div>
    <div class="footer">
      <p>Submitted on ${new Date(request.created_at || Date.now()).toLocaleString("en-US")}</p>
      <p>This is an automated notification from the ${SCHOOL_NAME} website.</p>
    </div>
  </div>
</body>
</html>
`;
}

// Send information request notification to staff
export async function sendStaffInformationRequestNotification(
  request: InformationRequest,
): Promise<boolean> {
  try {
    const html = getInformationRequestTemplate(request);

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: STAFF_EMAIL,
      subject: `Information Request: ${request.parent_name} - Child Age ${request.child_age}`,
      html,
      replyTo: request.email, // Allow staff to reply directly to the parent
    });

    console.log("Staff information request notification sent:", data);
    return true;
  } catch (error) {
    console.error("Error sending information request notification:", error);
    return false;
  }
}
