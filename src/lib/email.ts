import nodemailer from "nodemailer";

export const NOTIFICATION_RECIPIENT =
  process.env.NOTIFICATION_EMAIL || "mustafa.ahholdings@gmail.com";

// Create reusable SMTP transporter
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || NOTIFICATION_RECIPIENT;
  const pass = process.env.SMTP_PASS || "";

  if (!pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

// 1. Send Warranty Registration Notification to mustafa.ahholdings@gmail.com
export async function sendWarrantyNotification(warranty: {
  registrationId: string;
  customerName: string;
  mobile: string;
  email?: string;
  pincode: string;
  city?: string;
  state?: string;
  address?: string;
  products: Array<{
    model: string;
    serialNumber?: string;
    productName?: string;
    warrantyMonths?: number;
  }>;
  purchaseDate: string;
  source: string;
  dealerName?: string;
  dealerCity?: string;
  invoiceUrl?: string;
  warrantyExpiryDate?: string;
  createdAt?: Date | string;
}) {
  const transporter = getTransporter();

  const recipient = NOTIFICATION_RECIPIENT;
  const productsListHtml = (warranty.products || [])
    .map(
      (p, i) => `
      <div style="background: #f8f9fc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 8px;">
        <div style="font-weight: bold; color: #111214; font-size: 14px;">
          #${i + 1}. ${p.model}
        </div>
        ${
          p.productName && p.productName !== p.model
            ? `<div style="color: #6b7280; font-size: 12px; margin-top: 2px;">Specified: ${p.productName}</div>`
            : ""
        }
        ${
          p.serialNumber
            ? `<div style="font-family: monospace; color: #d31820; font-size: 12px; margin-top: 4px; font-weight: bold;">S/N: ${p.serialNumber}</div>`
            : `<div style="color: #059669; font-size: 11px; margin-top: 4px;">✓ Covered under Purchase Invoice</div>`
        }
        <div style="color: #059669; font-size: 12px; font-weight: bold; margin-top: 4px;">
          🛡️ ${p.warrantyMonths || 6} Months Official Manufacturer Warranty
        </div>
      </div>
    `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Warranty Registration</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 24px; color: #1f2937;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
        
        <!-- Header -->
        <div style="background: #0d0f12; padding: 24px 32px; border-bottom: 3px solid #e21b23;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">
              TUQO <span style="color: #e21b23;">TOOLS</span>
            </h1>
            <span style="background: rgba(226, 27, 35, 0.2); border: 1px solid rgba(226, 27, 35, 0.4); color: #ff5c62; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
              New Warranty Claim
            </span>
          </div>
          <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 12px;">
            A customer has submitted a new warranty registration on the website.
          </p>
        </div>

        <!-- Registration ID Banner -->
        <div style="background: #fef2f2; border-bottom: 1px solid #fee2e2; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 12px; color: #991b1b; font-weight: bold; text-transform: uppercase;">Registration ID:</span>
          <span style="font-family: monospace; font-size: 15px; font-weight: 900; color: #b91c1c;">${warranty.registrationId}</span>
        </div>

        <!-- Main Content -->
        <div style="padding: 28px 32px;">
          
          <!-- Customer Profile -->
          <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 900; text-transform: uppercase; color: #374151; letter-spacing: 0.5px;">
            👤 Customer Information
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 140px;">Customer Name:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #111827;">${warranty.customerName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Mobile Number:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #111827;">
                <a href="tel:${warranty.mobile}" style="color: #d31820; text-decoration: none;">+91 ${warranty.mobile}</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/91${warranty.mobile.replace(/\D/g, "")}" style="color: #059669; text-decoration: none; font-weight: bold;">WhatsApp Customer 💬</a>
              </td>
            </tr>
            ${
              warranty.email
                ? `<tr>
                    <td style="padding: 6px 0; color: #6b7280;">Email Address:</td>
                    <td style="padding: 6px 0; font-weight: bold; color: #111827;">
                      <a href="mailto:${warranty.email}" style="color: #2563eb; text-decoration: none;">${warranty.email}</a>
                    </td>
                  </tr>`
                : ""
            }
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">City & State:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #111827;">
                ${warranty.city ? `${warranty.city}, ` : ""}${warranty.state || ""} (Pincode: ${warranty.pincode})
              </td>
            </tr>
          </table>

          <!-- Equipment Info -->
          <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 900; text-transform: uppercase; color: #374151; letter-spacing: 0.5px;">
            ⚙️ Registered Equipment
          </h3>
          <div style="margin-bottom: 24px;">
            ${productsListHtml}
          </div>

          <!-- Purchase & Dealer Info -->
          <h3 style="margin: 0 0 12px 0; font-size: 13px; font-weight: 900; text-transform: uppercase; color: #374151; letter-spacing: 0.5px;">
            🏪 Dealer & Purchase Details
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 140px;">Dealer Name:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #111827;">${warranty.dealerName || "Direct / Online"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Dealer Location:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #111827;">${warranty.dealerCity || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Date of Purchase:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #111827;">${warranty.purchaseDate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Warranty Expiry:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #059669;">
                ${warranty.warrantyExpiryDate || "6 Months from Purchase"}
              </td>
            </tr>
          </table>

          <!-- Invoice Attachment Link -->
          ${
            warranty.invoiceUrl
              ? `
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
              <div style="font-weight: bold; color: #1e40af; font-size: 13px; margin-bottom: 8px;">
                📄 Customer Uploaded Purchase Invoice
              </div>
              <a href="${warranty.invoiceUrl}" target="_blank" style="display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 12px; padding: 10px 20px; border-radius: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                Click to View / Download Invoice Copy ↗
              </a>
            </div>
            `
              : ""
          }

          <!-- Admin CMS Action Button -->
          <div style="text-align: center; padding-top: 12px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 11px; color: #9ca3af; margin-bottom: 12px;">
              Manage and approve this registration in the TUQO Enterprise CMS dashboard:
            </p>
            <a href="https://tuqo-tools.vercel.app/admin?tab=warranties" target="_blank" style="display: inline-block; background: #111214; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 12px; padding: 10px 24px; border-radius: 8px; text-transform: uppercase;">
              Open Admin Dashboard 🛡️
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af;">
          TUQO Tools & Machinery | A.H HOLDINGS, Sidco Industrial Estate, Coimbatore, Tamil Nadu<br/>
          Notification sent automatically to <strong>${recipient}</strong>
        </div>

      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(
      `[Email Notification Info]: SMTP_PASS is not configured in environment variables. Email notification for registration ${warranty.registrationId} to ${recipient} was prepared but skipped.`
    );
    return { success: false, skipped: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"TUQO Warranty Desk" <${process.env.SMTP_USER || recipient}>`,
      to: recipient,
      subject: `🛡️ New Warranty Registration: ${warranty.registrationId} - ${warranty.customerName} (${warranty.products?.[0]?.model || "Equipment"})`,
      html: emailHtml,
    });
    console.log(`[Email Sent]: Warranty registration notification sent to ${recipient}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Error]: Failed to send warranty notification to ${recipient}:`, error);
    return { success: false, error };
  }
}

// 2. Send Contact Form Enquiry Notification to mustafa.ahholdings@gmail.com
export async function sendContactNotification(enquiry: {
  fullName: string;
  phone: string;
  email?: string;
  enquiryType: string;
  message: string;
  createdAt?: Date | string;
}) {
  const transporter = getTransporter();
  const recipient = NOTIFICATION_RECIPIENT;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Website Enquiry</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 24px; color: #1f2937;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
        
        <!-- Header -->
        <div style="background: #0d0f12; padding: 24px 32px; border-bottom: 3px solid #e21b23;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">
            TUQO <span style="color: #e21b23;">TOOLS</span>
          </h1>
          <p style="color: #9ca3af; margin: 6px 0 0 0; font-size: 12px;">
            New Contact Form Enquiry Received from Website
          </p>
        </div>

        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 140px; font-weight: bold;">Enquiry Type:</td>
              <td style="padding: 8px 0;">
                <span style="background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 6px; font-weight: 900; font-size: 12px;">
                  ${enquiry.enquiryType}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Full Name:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #111827; font-size: 14px;">${enquiry.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone Number:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #111827;">
                <a href="tel:${enquiry.phone}" style="color: #d31820; text-decoration: none;">+91 ${enquiry.phone}</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/91${enquiry.phone.replace(/\D/g, "")}" style="color: #059669; text-decoration: none; font-weight: bold;">WhatsApp 💬</a>
              </td>
            </tr>
            ${
              enquiry.email
                ? `<tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email Address:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #111827;">
                      <a href="mailto:${enquiry.email}" style="color: #2563eb; text-decoration: none;">${enquiry.email}</a>
                    </td>
                  </tr>`
                : ""
            }
          </table>

          <div style="background: #f8f9fc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #6b7280; margin-bottom: 8px; letter-spacing: 0.5px;">
              Customer Message:
            </div>
            <div style="font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">
${enquiry.message}
            </div>
          </div>

          <div style="text-align: center; padding-top: 12px; border-top: 1px solid #e5e7eb;">
            <a href="tel:${enquiry.phone}" style="display: inline-block; background: #d31820; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 12px; padding: 10px 24px; border-radius: 8px; text-transform: uppercase; margin-right: 8px;">
              📞 Call Customer
            </a>
            <a href="https://wa.me/91${enquiry.phone.replace(/\D/g, "")}" style="display: inline-block; background: #059669; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 12px; padding: 10px 24px; border-radius: 8px; text-transform: uppercase;">
              💬 WhatsApp Chat
            </a>
          </div>
        </div>

        <div style="background: #f9fafb; padding: 16px 32px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 11px; color: #9ca3af;">
          TUQO Tools & Machinery | A.H HOLDINGS<br/>
          Notification sent automatically to <strong>${recipient}</strong>
        </div>

      </div>
    </body>
    </html>
  `;

  if (!transporter) {
    console.log(
      `[Email Notification Info]: SMTP_PASS is not configured in environment variables. Email notification for enquiry from ${enquiry.fullName} to ${recipient} was prepared but skipped.`
    );
    return { success: false, skipped: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"TUQO Website Enquiry" <${process.env.SMTP_USER || recipient}>`,
      to: recipient,
      subject: `📩 New Website Enquiry: [${enquiry.enquiryType}] - ${enquiry.fullName}`,
      html: emailHtml,
    });
    console.log(`[Email Sent]: Contact enquiry notification sent to ${recipient}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[Email Error]: Failed to send contact enquiry notification to ${recipient}:`, error);
    return { success: false, error };
  }
}
