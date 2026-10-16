import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import WarrantyRegistration from "@/models/WarrantyRegistration";
import { sendWarrantyNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.customerName || !data.mobile || !data.pincode || !data.city || !data.state) {
      return NextResponse.json(
        { success: false, error: "Full Name, mobile number, pincode, city, and state are required" },
        { status: 400 }
      );
    }

    if (!data.dealerName || !data.dealerCity) {
      return NextResponse.json(
        { success: false, error: "Dealer / Store Name and Dealer City / Location are required" },
        { status: 400 }
      );
    }

    if (!data.invoiceUrl || !data.invoiceUrl.trim()) {
      return NextResponse.json(
        { success: false, error: "Invoice / Tax bill upload is mandatory to register warranty." },
        { status: 400 }
      );
    }

    if (!Array.isArray(data.products) || data.products.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one product selection is required" },
        { status: 400 }
      );
    }

    // Check if any provided serial number is already registered (only for non-empty serials)
    const validSerials = data.products
      .map((p: any) => (p.serialNumber ? p.serialNumber.trim() : ""))
      .filter((s: string) => s.length > 0);

    if (validSerials.length > 0) {
      const existing = await WarrantyRegistration.findOne({
        "products.serialNumber": { $in: validSerials },
      });

      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `One of the serial numbers (${validSerials.join(", ")}) is already registered with registration ID: ${existing.registrationId}`,
            existingRegistrationId: existing.registrationId,
          },
          { status: 409 }
        );
      }
    }

    // Generate unique Registration ID
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const registrationId = `TUQO-WR-${year}-${randomHex}`;

    // Calculate expiry date (6 months from purchase date)
    let warrantyExpiryDate = "";
    try {
      const pDate = new Date(data.purchaseDate || Date.now());
      pDate.setMonth(pDate.getMonth() + 6);
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
        serialNumber: (p.serialNumber || "").trim().toUpperCase(),
        productName: p.productName?.trim() || "",
        warrantyMonths: p.warrantyMonths || 6,
      })),
      purchaseDate: data.purchaseDate || new Date().toISOString().split("T")[0],
      source: data.source || "Authorized Dealer",
      dealerName: data.dealerName?.trim() || "",
      dealerCity: data.dealerCity?.trim() || "",
      invoiceUrl: data.invoiceUrl.trim(),
      status: "Active",
      warrantyExpiryDate,
      notes: data.notes || "",
    });

    // Send email notification to mustafa.ahholdings@gmail.com
    try {
      await sendWarrantyNotification(newWarranty);
    } catch (emailErr) {
      console.error("Failed to send warranty notification email:", emailErr);
    }

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
