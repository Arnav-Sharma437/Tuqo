import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import WarrantyModel from "@/models/WarrantyModel";
import { DEFAULT_WARRANTY_MODELS } from "@/app/api/admin/warranty-models/route";

export const dynamic = "force-dynamic";

// GET /api/warranty/models (Public endpoint for Warranty Registration Form)
export async function GET() {
  try {
    await connectToDatabase();
    const models = await WarrantyModel.find({ active: true }).sort({ order: 1, createdAt: 1 });

    return NextResponse.json({
      success: true,
      models: models.map((m) => ({
        id: m._id.toString(),
        name: m.name,
        code: m.code || "",
        category: m.category || "General",
        warrantyMonths: m.warrantyMonths || 6,
      })),
    });
  } catch (error: unknown) {
    console.error("Failed to load public warranty models:", error);
    // Return fallback list so the frontend form remains 100% operational
    return NextResponse.json({
      success: true,
      models: DEFAULT_WARRANTY_MODELS.filter((m) => m.active).map((m, idx) => ({
        id: `fallback-${idx}`,
        name: m.name,
        code: m.code,
        category: m.category,
        warrantyMonths: m.warrantyMonths,
      })),
      fallback: true,
    });
  }
}
