import { NextRequest, NextResponse } from "next/server";
import {
  createInformationRequest,
  type InformationRequestInsert,
} from "@/lib/supabase";
import { sendStaffInformationRequestNotification } from "@/lib/email";
import { contactRateLimiter, withRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  return withRateLimit(request, contactRateLimiter, async () => {
    try {
      const data = await request.json();

    // Validate required fields
    const requiredFields = ["parentName", "email", "phone", "childAge"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate phone number
    if (
      !/^[+]?[\d\s()-]+$/.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < 10
    ) {
      return NextResponse.json(
        { error: "Please enter a valid phone number (at least 10 digits)" },
        { status: 400 },
      );
    }

    // Generate unique request ID
    const requestId = `REQ-${Date.now()}`;

    // Prepare data for database
    const requestData: InformationRequestInsert = {
      parent_name: data.parentName,
      email: data.email,
      phone: data.phone,
      child_age: data.childAge,
      message: data.message || null,
      request_id: requestId,
      status: "new",
    };

    // Save to database
    const savedRequest = await createInformationRequest(requestData);

    console.log("New information request saved:", {
      id: savedRequest.id,
      requestId: savedRequest.request_id,
      parentName: savedRequest.parent_name,
      email: savedRequest.email,
      childAge: savedRequest.child_age,
      timestamp: savedRequest.created_at,
    });

    // Send notification email to staff (don't wait for completion)
    sendStaffInformationRequestNotification(savedRequest).catch((err) => {
      console.error("Failed to send staff notification email:", err);
    });

    // Return success response immediately
    return NextResponse.json({
      success: true,
      message: "Information request submitted successfully",
      requestId: savedRequest.request_id,
    });
  } catch (error) {
    console.error("Error processing information request:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      // Database-related errors
      if (
        error.message.includes("duplicate") ||
        error.message.includes("unique")
      ) {
        return NextResponse.json(
          { error: "A request with this information already exists" },
          { status: 409 },
        );
      }

      // Connection errors
      if (
        error.message.includes("connect") ||
        error.message.includes("ECONNREFUSED")
      ) {
        return NextResponse.json(
          {
            error: "Unable to connect to the database. Please try again later.",
          },
          { status: 503 },
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 },
    );
    }
  });
}

