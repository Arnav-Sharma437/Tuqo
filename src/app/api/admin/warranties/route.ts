import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { getAdminSession } from "@/lib/auth";
import WarrantyRegistration from "@/models/WarrantyRegistration";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";

    const query: Record<string, any> = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { registrationId: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { dealerName: { $regex: search, $options: "i" } },
        { "products.serialNumber": { $regex: search, $options: "i" } },
        { "products.model": { $regex: search, $options: "i" } },
      ];
    }

    const warranties = await WarrantyRegistration.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, count: warranties.length, warranties });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch warranties";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
