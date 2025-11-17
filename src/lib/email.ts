import nodemailer from "nodemailer";

// Email configuration using Brevo SMTP
export const emailConfig = {
  host: process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com",
  port: parseInt(process.env.BREVO_SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
};

// Create reusable transporter
export const createEmailTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};

// Email templates
export const generateContactEmail = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return {
    from: process.env.BREVO_SENDER_EMAIL || process.env.BREVO_SMTP_USER,
    to: process.env.RECIPIENT_EMAIL || "dev@mandc2025.org",
    replyTo: data.email,
    subject: `Portfolio Contact: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Courier New', monospace; background: #000; color: #fff; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #262626; padding: 30px; }
            .header { border-bottom: 2px solid #fff; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; }
            .field { margin-bottom: 20px; }
            .label { color: #a3a3a3; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px; }
            .value { font-size: 16px; line-height: 1.6; }
            .message-box { background: #1a1a1a; border: 1px solid #333; padding: 20px; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #262626; color: #737373; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NEW CONTACT MESSAGE</h1>
            </div>
            
            <div class="field">
              <div class="label">FROM</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">EMAIL</div>
              <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
              <div class="label">SUBJECT</div>
              <div class="value">${data.subject}</div>
            </div>
            
            <div class="field">
              <div class="label">MESSAGE</div>
              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="footer">
              Sent from your portfolio contact form at ${new Date().toLocaleString()}
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
NEW CONTACT MESSAGE
===================

FROM: ${data.name}
EMAIL: ${data.email}
SUBJECT: ${data.subject}

MESSAGE:
${data.message}

---
Sent from your portfolio contact form at ${new Date().toLocaleString()}
    `,
  };
};
