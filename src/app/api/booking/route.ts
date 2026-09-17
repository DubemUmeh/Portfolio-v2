import { NextRequest, NextResponse } from "next/server";
import { createEmailTransporter } from "@/lib/email";
import { sanitizeInput } from "@/lib/validation";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 5,
});

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateCheck = limiter.check(ip);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, message: "Too many booking requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website || body.confirm_email || body.honeypot) {
      console.warn(`Honeypot triggered in booking API by IP ${ip}`);
      return NextResponse.json({ success: false, message: "Invalid submission" }, { status: 400 });
    }

    // Speed check
    const formStartTime = Number(body.formStartTime);
    if (!formStartTime || isNaN(formStartTime)) {
      return NextResponse.json({ success: false, message: "Invalid session" }, { status: 400 });
    }

    const elapsedSeconds = (Date.now() - formStartTime) / 1000;
    if (elapsedSeconds < 3) {
      console.warn(`Booking submitted too fast (${elapsedSeconds.toFixed(2)}s) by IP ${ip}`);
      return NextResponse.json({ success: false, message: "Submission submitted too fast." }, { status: 400 });
    }

    // Turnstile check
    const turnstileToken = body["cf-turnstile-response"] || body.turnstileToken;
    const turnstileResult = await verifyTurnstileToken(turnstileToken, ip, "booking");

    if (!turnstileResult.success) {
      return NextResponse.json(
        { success: false, message: turnstileResult.error || "Security check failed." },
        { status: 400 }
      );
    }

    const name = sanitizeInput(body.name || "");
    const email = sanitizeInput(body.email || "");
    const service = sanitizeInput(body.service || "");
    const date = sanitizeInput(body.date || "");
    const details = sanitizeInput(body.details || "");

    if (!name || !email || !service || !date) {
      return NextResponse.json({ success: false, message: "Please fill in all required fields." }, { status: 400 });
    }

    if (!process.env.BREVO_SMTP_USER || !process.env.BREVO_SMTP_PASSWORD) {
      console.error("Missing email credentials.");
      return NextResponse.json({ success: false, message: "Email service unconfigured." }, { status: 500 });
    }

    const transporter = createEmailTransporter();
    await transporter.sendMail({
      from: `"Booking Request" <${process.env.BREVO_SMTP_USER}>`,
      to: "dev@umeh.site",
      replyTo: email,
      subject: `New Booking Request: ${service} from ${name}`,
      html: `
        <h2>New Client Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Requested:</strong> ${service}</p>
        <p><strong>Preferred Date/Timeline:</strong> ${date}</p>
        <p><strong>Project Details:</strong></p>
        <p>${details.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Booking request submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Booking submission error:", error);
    return NextResponse.json({ success: false, message: "Failed to submit booking request." }, { status: 500 });
  }
}
