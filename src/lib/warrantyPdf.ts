import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export interface WarrantyCertificateData {
  registrationId: string;
  customerName: string;
  mobile: string;
  email?: string;
  pincode?: string;
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
  warrantyExpiryDate?: string;
  dealerName?: string;
  dealerCity?: string;
  status?: string;
}

/**
 * Generate a crisp, official vector PDF Warranty Certificate using pdf-lib
 */
export async function generateWarrantyCertificatePdf(
  data: WarrantyCertificateData
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();

  // Standard A4: 595.28 x 841.89 points
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Embed Fonts
  const helvetica = await doc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const courierBold = await doc.embedFont(StandardFonts.CourierBold);

  // Brand Palette
  const brandRed = rgb(0.85, 0.1, 0.13); // #d91a22
  const brandDark = rgb(0.08, 0.09, 0.11); // #14171c
  const textDark = rgb(0.12, 0.13, 0.16);
  const textGray = rgb(0.42, 0.45, 0.5);
  const lightBg = rgb(0.97, 0.98, 0.99);
  const cardBorder = rgb(0.86, 0.88, 0.91);
  const emeraldGreen = rgb(0.08, 0.62, 0.35); // #149e59
  const emeraldBg = rgb(0.92, 0.98, 0.94);
  const white = rgb(1, 1, 1);

  // 1. OUTER DECORATIVE BORDER (Certificate Framing)
  // Outer Red Border
  page.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: brandRed,
    borderWidth: 2,
  });

  // Inner Subtle Border
  page.drawRectangle({
    x: 29,
    y: 29,
    width: width - 58,
    height: height - 58,
    borderColor: cardBorder,
    borderWidth: 0.8,
  });

  // Top Red Accent Header Bar
  page.drawRectangle({
    x: 29,
    y: height - 37,
    width: width - 58,
    height: 8,
    color: brandRed,
  });

  // Corner Accent Marks
  const cornerSize = 10;
  // Top-left
  page.drawRectangle({ x: 32, y: height - 48, width: cornerSize, height: 2, color: brandRed });
  page.drawRectangle({ x: 32, y: height - 48 - cornerSize, width: 2, height: cornerSize, color: brandRed });
  // Top-right
  page.drawRectangle({ x: width - 32 - cornerSize, y: height - 48, width: cornerSize, height: 2, color: brandRed });
  page.drawRectangle({ x: width - 34, y: height - 48 - cornerSize, width: 2, height: cornerSize, color: brandRed });
  // Bottom-left
  page.drawRectangle({ x: 32, y: 34, width: cornerSize, height: 2, color: brandRed });
  page.drawRectangle({ x: 32, y: 34, width: 2, height: cornerSize, color: brandRed });
  // Bottom-right
  page.drawRectangle({ x: width - 32 - cornerSize, y: 34, width: cornerSize, height: 2, color: brandRed });
  page.drawRectangle({ x: width - 34, y: 34, width: 2, height: cornerSize, color: brandRed });

  // 2. EMBED TUQO LOGO
  let logoDrawn = false;
  try {
    const logoPath = path.join(process.cwd(), "public", "brand", "tuqo-logo-red.png");
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await doc.embedPng(logoBytes);
      const logoDims = logoImage.scale(0.24); // scale down cleanly
      page.drawImage(logoImage, {
        x: 48,
        y: height - 100,
        width: Math.min(logoDims.width, 140),
        height: Math.min(logoDims.height, 46),
      });
      logoDrawn = true;
    }
  } catch (err) {
    console.warn("Could not embed logo image, falling back to vector text:", err);
  }

  if (!logoDrawn) {
    page.drawText("TUQO", {
      x: 48,
      y: height - 85,
      size: 26,
      font: helveticaBold,
      color: brandRed,
    });
    page.drawText("INDUSTRIAL TOOLS & MACHINERY", {
      x: 48,
      y: height - 98,
      size: 7,
      font: helveticaBold,
      color: brandDark,
    });
  }

  // 3. TOP RIGHT STATUS BADGE
  // Active / Protected Badge
  const badgeWidth = 110;
  const badgeHeight = 26;
  const badgeX = width - 48 - badgeWidth;
  const badgeY = height - 88;

  page.drawRectangle({
    x: badgeX,
    y: badgeY,
    width: badgeWidth,
    height: badgeHeight,
    color: emeraldGreen,
    borderWidth: 0,
  });

  // Draw vector checkmark inside badge
  page.drawLine({
    start: { x: badgeX + 14, y: badgeY + 12 },
    end: { x: badgeX + 19, y: badgeY + 7 },
    thickness: 2.2,
    color: white,
  });
  page.drawLine({
    start: { x: badgeX + 19, y: badgeY + 7 },
    end: { x: badgeX + 27, y: badgeY + 18 },
    thickness: 2.2,
    color: white,
  });

  page.drawText("ACTIVE", {
    x: badgeX + 34,
    y: badgeY + 8,
    size: 11,
    font: helveticaBold,
    color: white,
  });

  page.drawText("STATUS: 6-MONTH WARRANTY", {
    x: badgeX - 70,
    y: badgeY + 16,
    size: 7.5,
    font: helveticaBold,
    color: emeraldGreen,
  });

  page.drawText("OFFICIALLY PROTECTED", {
    x: badgeX - 45,
    y: badgeY + 5,
    size: 7,
    font: helveticaBold,
    color: textGray,
  });

  // Top Divider Line
  page.drawLine({
    start: { x: 48, y: height - 114 },
    end: { x: width - 48, y: height - 114 },
    thickness: 1,
    color: cardBorder,
  });

  // 4. MAIN CERTIFICATE TITLE & INTRO
  page.drawText("DIGITAL WARRANTY CERTIFICATE", {
    x: 48,
    y: height - 142,
    size: 18,
    font: helveticaBold,
    color: brandDark,
  });

  page.drawText(
    "This certificate verifies that your TUQO equipment has been registered and is protected under genuine manufacturer warranty.",
    {
      x: 48,
      y: height - 158,
      size: 8.5,
      font: helvetica,
      color: textGray,
    }
  );

  // 5. REGISTRATION SUMMARY CARD (Grey styled box)
  const cardY = height - 355;
  const cardHeight = 180;
  page.drawRectangle({
    x: 48,
    y: cardY,
    width: width - 96,
    height: cardHeight,
    color: lightBg,
    borderColor: cardBorder,
    borderWidth: 1,
  });

  // Top header strip in card
  page.drawRectangle({
    x: 48,
    y: cardY + cardHeight - 24,
    width: width - 96,
    height: 24,
    color: rgb(0.93, 0.94, 0.96),
  });

  page.drawText("REGISTRATION & CUSTOMER PARTICULARS", {
    x: 60,
    y: cardY + cardHeight - 16,
    size: 8,
    font: helveticaBold,
    color: brandDark,
  });

  page.drawText("CENTRAL DATABASE RECORD", {
    x: width - 210,
    y: cardY + cardHeight - 16,
    size: 7.5,
    font: helveticaBold,
    color: brandRed,
  });

  // Column 1 - Registration & Dealer (X: 62)
  let curY = cardY + cardHeight - 44;

  // Registration ID
  page.drawText("REGISTRATION ID:", { x: 62, y: curY, size: 7.5, font: helveticaBold, color: textGray });
  page.drawText(data.registrationId, { x: 62, y: curY - 14, size: 12, font: courierBold, color: brandRed });

  curY -= 36;
  // Purchase Date
  page.drawText("PURCHASE DATE:", { x: 62, y: curY, size: 7.5, font: helveticaBold, color: textGray });
  page.drawText(data.purchaseDate || "N/A", { x: 62, y: curY - 12, size: 10, font: helveticaBold, color: textDark });

  curY -= 32;
  // Authorized Dealer
  page.drawText("AUTHORIZED DEALER / STORE:", { x: 62, y: curY, size: 7.5, font: helveticaBold, color: textGray });
  const dealerString = `${data.dealerName || "Direct / Authorized Store"}${data.dealerCity ? ` (${data.dealerCity})` : ""}`;
  page.drawText(dealerString.slice(0, 36), { x: 62, y: curY - 12, size: 9.5, font: helveticaBold, color: textDark });

  // Column 2 - Customer & Expiry (X: 310)
  curY = cardY + cardHeight - 44;

  // Customer Name
  page.drawText("CUSTOMER NAME:", { x: 310, y: curY, size: 7.5, font: helveticaBold, color: textGray });
  page.drawText((data.customerName || "Customer").slice(0, 30), {
    x: 310,
    y: curY - 13,
    size: 11,
    font: helveticaBold,
    color: textDark,
  });

  curY -= 36;
  // Mobile & Email
  page.drawText("CONTACT MOBILE:", { x: 310, y: curY, size: 7.5, font: helveticaBold, color: textGray });
  page.drawText(`+91 ${data.mobile || ""}${data.email ? `  |  ${data.email}` : ""}`.slice(0, 36), {
    x: 310,
    y: curY - 12,
    size: 9.5,
    font: helveticaBold,
    color: textDark,
  });

  curY -= 32;
  // Valid Until
  page.drawText("WARRANTY VALID UNTIL:", { x: 310, y: curY, size: 7.5, font: helveticaBold, color: textGray });
  const expiryText = data.warrantyExpiryDate || "6 Months from Purchase Date";
  page.drawText(expiryText, {
    x: 310,
    y: curY - 13,
    size: 11,
    font: helveticaBold,
    color: emeraldGreen,
  });

  // Customer Address Line (bottom of card)
  const fullAddress = [data.address, data.city, data.state, data.pincode ? `(${data.pincode})` : ""]
    .filter(Boolean)
    .join(", ");
  if (fullAddress) {
    page.drawLine({
      start: { x: 60, y: cardY + 28 },
      end: { x: width - 60, y: cardY + 28 },
      thickness: 0.6,
      color: cardBorder,
    });
    page.drawText("CUSTOMER LOCATION: ", {
      x: 62,
      y: cardY + 12,
      size: 7.5,
      font: helveticaBold,
      color: textGray,
    });
    page.drawText(fullAddress.slice(0, 75), {
      x: 165,
      y: cardY + 12,
      size: 8,
      font: helvetica,
      color: textDark,
    });
  }

  // 6. COVERED EQUIPMENT SECTION
  const equipHeaderY = cardY - 24;
  page.drawText("COVERED EQUIPMENT / MACHINERY", {
    x: 48,
    y: equipHeaderY,
    size: 10,
    font: helveticaBold,
    color: brandRed,
  });

  page.drawText(`(${data.products?.length || 1} Unit${(data.products?.length || 1) > 1 ? "s" : ""} Registered)`, {
    x: 245,
    y: equipHeaderY,
    size: 8,
    font: helveticaBold,
    color: textGray,
  });

  let equipY = equipHeaderY - 12;
  const productList = data.products && data.products.length > 0 ? data.products : [{ model: "TUQO Industrial Equipment", warrantyMonths: 6 }];

  // Draw product boxes (up to 4 products)
  for (let i = 0; i < Math.min(productList.length, 4); i++) {
    const p = productList[i];
    const boxHeight = 36;
    equipY -= boxHeight + 6;

    // Product item card
    page.drawRectangle({
      x: 48,
      y: equipY,
      width: width - 96,
      height: boxHeight,
      color: white,
      borderColor: cardBorder,
      borderWidth: 1,
    });

    // Left Icon pill
    page.drawRectangle({
      x: 52,
      y: equipY + 4,
      width: 28,
      height: 28,
      color: rgb(0.95, 0.95, 0.97),
    });
    page.drawText("#", {
      x: 62,
      y: equipY + 12,
      size: 12,
      font: helveticaBold,
      color: brandRed,
    });

    // Product Model
    const modelTitle = (p.productName || p.model || "TUQO Industrial Equipment").slice(0, 50);
    page.drawText(modelTitle, {
      x: 90,
      y: equipY + 20,
      size: 9.5,
      font: helveticaBold,
      color: textDark,
    });

    // Serial Number or Invoice coverage
    const serialInfo = p.serialNumber
      ? `Serial #: ${p.serialNumber}`
      : "Coverage Authenticated via Purchase Invoice";
    page.drawText(serialInfo, {
      x: 90,
      y: equipY + 8,
      size: 8,
      font: courierBold,
      color: p.serialNumber ? rgb(0.8, 0.4, 0.1) : textGray,
    });

    // Right side warranty duration pill
    const months = p.warrantyMonths || 6;
    const durBadgeWidth = 96;
    page.drawRectangle({
      x: width - 48 - durBadgeWidth - 8,
      y: equipY + 6,
      width: durBadgeWidth,
      height: 24,
      color: emeraldBg,
      borderColor: rgb(0.75, 0.9, 0.8),
      borderWidth: 0.6,
    });
    page.drawText(`${months} Months Warranty`, {
      x: width - 48 - durBadgeWidth,
      y: equipY + 14,
      size: 8,
      font: helveticaBold,
      color: emeraldGreen,
    });
  }

  // 7. OFFICIAL VERIFICATION & SECURITY SEAL STRIP
  const sealY = equipY - 68;
  page.drawRectangle({
    x: 48,
    y: sealY,
    width: width - 96,
    height: 54,
    color: rgb(0.98, 0.98, 0.99),
    borderColor: cardBorder,
    borderWidth: 1,
  });

  // Left Security barcode simulation & verify link
  page.drawText("AUTHENTICITY & VERIFICATION CODE", {
    x: 60,
    y: sealY + 38,
    size: 7.5,
    font: helveticaBold,
    color: brandDark,
  });

  page.drawText(`VERIFY ONLINE: tuqotools.com/warranty  |  KEY: ${data.registrationId}`, {
    x: 60,
    y: sealY + 24,
    size: 8,
    font: courierBold,
    color: brandRed,
  });

  page.drawText("Scan QR or verify with registered mobile number on the official TUQO website portal.", {
    x: 60,
    y: sealY + 11,
    size: 7,
    font: helvetica,
    color: textGray,
  });

  // Right Official Quality Seal
  page.drawRectangle({
    x: width - 170,
    y: sealY + 8,
    width: 110,
    height: 38,
    color: rgb(0.95, 0.96, 0.98),
    borderColor: brandRed,
    borderWidth: 1,
  });

  page.drawText("TUQO CERTIFIED", {
    x: width - 158,
    y: sealY + 28,
    size: 8,
    font: helveticaBold,
    color: brandRed,
  });
  page.drawText("GENUINE WARRANTY", {
    x: width - 162,
    y: sealY + 16,
    size: 7,
    font: helveticaBold,
    color: brandDark,
  });

  // 8. TERMS & CONDITIONS SUMMARY
  const termsY = sealY - 88;
  page.drawText("MANUFACTURER WARRANTY TERMS & POLICY:", {
    x: 48,
    y: termsY + 68,
    size: 8,
    font: helveticaBold,
    color: brandDark,
  });

  const terms = [
    "1. This warranty is valid for 6 months starting from the verified purchase date on your dealer invoice.",
    "2. Warranty covers manufacturing defects, motor armature/stator failure, and internal pump casting faults under normal usage.",
    "3. Excludes normal wear & tear of consumable accessories (hoses, carbon brushes, spray nozzles, O-rings, power cords).",
    "4. For claims, present this digital certificate copy alongside your dealer tax invoice to our authorized service network.",
  ];

  let ty = termsY + 54;
  for (const t of terms) {
    page.drawText(t, {
      x: 48,
      y: ty,
      size: 7,
      font: helvetica,
      color: textGray,
    });
    ty -= 12;
  }

  // 9. FOOTER CONTACT STRIP
  const footerY = 40;
  page.drawLine({
    start: { x: 48, y: footerY + 26 },
    end: { x: width - 48, y: footerY + 26 },
    thickness: 0.8,
    color: cardBorder,
  });

  page.drawText(
    "WhatsApp Claims Desk: +91 93424 66860   |   Email: mustafa.ahholdings@gmail.com   |   Web: www.tuqotools.com",
    {
      x: 52,
      y: footerY + 12,
      size: 7.5,
      font: helveticaBold,
      color: brandDark,
    }
  );

  page.drawText("TUQO Tools & Machinery India | Official Manufacturer Warranty Certificate", {
    x: 52,
    y: footerY + 1,
    size: 6.5,
    font: helvetica,
    color: textGray,
  });

  page.drawText("PAGE 1 OF 1", {
    x: width - 100,
    y: footerY + 1,
    size: 6.5,
    font: courierBold,
    color: textGray,
  });

  // Serialize PDF to bytes
  const pdfBytes = await doc.save();
  return pdfBytes;
}
