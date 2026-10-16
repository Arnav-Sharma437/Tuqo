import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { WarrantyRegistration } from "@/models/WarrantyRegistration";
import { generateWarrantyCertificatePdf } from "@/lib/warrantyPdf";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Registration ID required" }, { status: 400 });
    }

    await dbConnect();

    // Find by either registrationId (e.g. TUQO-WR-2026-BC9N) or MongoDB _id
    let warranty = await WarrantyRegistration.findOne({
      $or: [
        { registrationId: id.toUpperCase().trim() },
        { registrationId: id.trim() },
      ],
    }).lean();

    if (!warranty && id.match(/^[0-9a-fA-F]{24}$/)) {
      warranty = await WarrantyRegistration.findById(id).lean();
    }

    if (!warranty) {
      return NextResponse.json(
        { success: false, error: "Warranty registration not found" },
        { status: 404 }
      );
    }

    // Format expiry date if missing
    let expiry = warranty.warrantyExpiryDate;
    if (!expiry && warranty.purchaseDate) {
      const pDate = new Date(warranty.purchaseDate);
      if (!isNaN(pDate.getTime())) {
        pDate.setMonth(pDate.getMonth() + 6);
        expiry = pDate.toISOString().split("T")[0];
      }
    }

    const pdfBytes = await generateWarrantyCertificatePdf({
      registrationId: warranty.registrationId,
      customerName: warranty.customerName,
      mobile: warranty.mobile,
      email: warranty.email,
      pincode: warranty.pincode,
      city: warranty.city,
      state: warranty.state,
      address: warranty.address,
      products: warranty.products || [],
      purchaseDate: warranty.purchaseDate,
      warrantyExpiryDate: expiry,
      dealerName: warranty.dealerName,
      dealerCity: warranty.dealerCity,
      status: warranty.status,
    });

    const filename = `TUQO-Warranty-${warranty.registrationId}.pdf`;

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err: unknown) {
    console.error("PDF generation error:", err);
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
