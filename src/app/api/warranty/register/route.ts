import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import WarrantyRegistration from "@/models/WarrantyRegistration";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.customerName || !data.mobile || !data.pincode) {
      return NextResponse.json(
        { success: false, error: "Name, mobile number, and pincode are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(data.products) || data.products.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one product with serial number is required" },
        { status: 400 }
      );
    }

    // Validate that every product has serial number and model
    for (const p of data.products) {
      if (!p.serialNumber || !p.serialNumber.trim()) {
        return NextResponse.json(
          { success: false, error: "Serial/Barcode number is required for all products" },
          { status: 400 }
        );
      }
    }

    // Check if any serial number is already registered
    const serials = data.products.map((p: any) => p.serialNumber.trim());
    const existing = await WarrantyRegistration.findOne({
      "products.serialNumber": { $in: serials },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `One of the serial numbers (${serials.join(", ")}) is already registered with registration ID: ${existing.registrationId}`,
          existingRegistrationId: existing.registrationId,
        },
        { status: 409 }
      );
    }

    // Generate unique Registration ID
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const registrationId = `TUQO-WR-${year}-${randomHex}`;

    // Calculate expiry date (12 months from purchase date)
    let warrantyExpiryDate = "";
    try {
      const pDate = new Date(data.purchaseDate || Date.now());
      pDate.setFullYear(pDate.getFullYear() + 1);
      warrantyExpiryDate = pDate.toISOString().split("T")[0];
    } catch {
      warrantyExpiryDate = "";
    }

    const newWarranty = await WarrantyRegistration.create({
      registrationId,
      customerName: data.customerName.trim(),
      mobile: data.mobile.trim(),
      email: data.email?.trim() || "",
      pincode: data.pincode.trim(),
      city: data.city?.trim() || "",
      state: data.state?.trim() || "",
      address: data.address?.trim() || "",
      products: data.products.map((p: any) => ({
        model: p.model?.trim() || "TUQO Equipment",
        serialNumber: p.serialNumber.trim().toUpperCase(),
        productName: p.productName?.trim() || "",
        warrantyMonths: p.warrantyMonths || 12,
      })),
      purchaseDate: data.purchaseDate || new Date().toISOString().split("T")[0],
      source: data.source || "Authorized Dealer",
      dealerName: data.dealerName?.trim() || "",
      dealerCity: data.dealerCity?.trim() || "",
      invoiceUrl: data.invoiceUrl || "",
      status: "Active",
      warrantyExpiryDate,
      notes: data.notes || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Warranty registered successfully",
        registrationId: newWarranty.registrationId,
        warranty: newWarranty,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Warranty registration error:", error);
    const message = error instanceof Error ? error.message : "Failed to register warranty";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
