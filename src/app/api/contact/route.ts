import { NextRequest, NextResponse } from "next/server";
import { createEmailTransporter, generateContactEmail } from "@/lib/email";
import { validateContactForm, sanitizeInput, type ContactFormData } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Sanitize inputs
    const formData: ContactFormData = {
      name: sanitizeInput(body.name || ""),
      email: sanitizeInput(body.email || ""),
      subject: sanitizeInput(body.subject || ""),
      message: sanitizeInput(body.message || ""),
    };

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD) {
      console.error("Missing email configuration. Please set BREVO_SMTP_USER and BREVO_SMTP_PASSWORD environment variables.");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Create email transporter
    const transporter = createEmailTransporter();

    // Generate email content
    const emailOptions = generateContactEmail(formData);

    // Send email
    await transporter.sendMail(emailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Handle specific nodemailer errors
    if (error instanceof Error) {
      if (error.message.includes("Invalid login")) {
        return NextResponse.json(
          {
            success: false,
            message: "Email authentication failed. Please check SMTP credentials.",
          },
          { status: 500 }
        );
      }
      if (error.message.includes("ECONNREFUSED")) {
        return NextResponse.json(
          {
            success: false,
            message: "Could not connect to email server. Please try again later.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
