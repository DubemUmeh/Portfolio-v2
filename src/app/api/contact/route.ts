import { NextRequest, NextResponse } from "next/server";
import { createEmailTransporter, generateContactEmail } from "@/lib/email";
import { validateContactForm, sanitizeInput, type ContactFormData } from "@/lib/validation";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute window
  uniqueTokenPerInterval: 5, // Max 5 requests per minute per IP
});

export async function POST(request: NextRequest) {
  try {
    // Extract client IP address for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // Rate limiting check
    const rateCheck = limiter.check(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please slow down and try again later.",
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // 1. Honeypot check: If honeypot field is filled out, reject immediately as bot submission
    if (body.website || body.confirm_email || body.honeypot) {
      console.warn(`Honeypot triggered by IP ${ip}`);
      return NextResponse.json(
        { success: false, message: "Invalid submission" },
        { status: 400 }
      );
    }

    // 2. Submission speed check: Reject unrealistically fast submissions (< 3 seconds)
    const formStartTime = Number(body.formStartTime);
    if (!formStartTime || isNaN(formStartTime)) {
      return NextResponse.json(
        { success: false, message: "Invalid form session" },
        { status: 400 }
      );
    }

    const elapsedSeconds = (Date.now() - formStartTime) / 1000;
    if (elapsedSeconds < 3) {
      console.warn(`Submission submitted too quickly (${elapsedSeconds.toFixed(2)}s) by IP ${ip}`);
      return NextResponse.json(
        { success: false, message: "Form submitted too fast. Please try again." },
        { status: 400 }
      );
    }

    // 3. Turnstile verification
    const turnstileToken = body["cf-turnstile-response"] || body.turnstileToken;
    const turnstileResult = await verifyTurnstileToken(turnstileToken, ip, "contact");

    if (!turnstileResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: turnstileResult.error || "Security check failed. Please verify you are human.",
        },
        { status: 400 }
      );
    }

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
