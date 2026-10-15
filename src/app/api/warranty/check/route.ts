import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import WarrantyRegistration from "@/models/WarrantyRegistration";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("query") || searchParams.get("serial") || "").trim();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Please provide a Mobile Number or Registration ID to check warranty status" },
        { status: 400 }
      );
    }

    const reg = await WarrantyRegistration.findOne({
      $or: [
        { registrationId: { $regex: new RegExp(`^${query}$`, "i") } },
        { mobile: query },
        { "products.serialNumber": { $regex: new RegExp(`^${query}$`, "i") } },
      ],
    }).lean();

    if (!reg) {
      return NextResponse.json(
        {
          success: false,
          found: false,
          message: "No active warranty record found for this Mobile Number or Registration ID. Please verify your details or register your product.",
        },
        { status: 404 }
      );
    }

    // Mask sensitive details
    const maskedMobile = reg.mobile ? reg.mobile.replace(/(\d{2})\d+(\d{2})/, "$1******$2") : "";
    const maskedName = reg.customerName ? reg.customerName.replace(/(.).+/g, "$1***") : "";

    return NextResponse.json({
      success: true,
      found: true,
      warranty: {
        registrationId: reg.registrationId,
        customerName: maskedName,
        mobile: maskedMobile,
        products: reg.products,
        purchaseDate: reg.purchaseDate,
        warrantyExpiryDate: reg.warrantyExpiryDate,
        dealerName: reg.dealerName,
        status: reg.status,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to verify warranty";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
