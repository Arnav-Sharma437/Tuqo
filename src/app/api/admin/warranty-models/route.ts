import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import WarrantyModel from "@/models/WarrantyModel";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const DEFAULT_WARRANTY_MODELS = [
  {
    name: "HW2020 (145 Bar / 1750W Induction High Pressure Washer)",
    code: "HW2020",
    category: "High Pressure Washers",
    warrantyMonths: 6,
    order: 1,
    active: true,
  },
  {
    name: "HW2200 (160 Bar / 2200W Commercial Pressure Washer)",
    code: "HW2200",
    category: "High Pressure Washers",
    warrantyMonths: 6,
    order: 2,
    active: true,
  },
  {
    name: "HW2500 (180 Bar / 2500W Heavy Industrial Washer)",
    code: "HW2500",
    category: "High Pressure Washers",
    warrantyMonths: 6,
    order: 3,
    active: true,
  },
  {
    name: "AC-50L (2.5 HP Direct Drive Air Compressor)",
    code: "AC-50L",
    category: "Air Compressors",
    warrantyMonths: 6,
    order: 4,
    active: true,
  },
  {
    name: "AC-100L (3.0 HP Belt Driven Industrial Compressor)",
    code: "AC-100L",
    category: "Air Compressors",
    warrantyMonths: 6,
    order: 5,
    active: true,
  },
  {
    name: "PT-AG100 (100mm 850W Heavy Angle Grinder)",
    code: "PT-AG100",
    category: "Power Tools",
    warrantyMonths: 6,
    order: 6,
    active: true,
  },
  {
    name: "PT-HD26 (26mm 800W Rotary Hammer Drill)",
    code: "PT-HD26",
    category: "Power Tools",
    warrantyMonths: 6,
    order: 7,
    active: true,
  },
  {
    name: "PT-DM0810 (1100W Demolition Breaker Machine)",
    code: "PT-DM0810",
    category: "Power Tools",
    warrantyMonths: 6,
    order: 8,
    active: true,
  },
  {
    name: "VC-30L (Stainless Steel Wet & Dry Industrial Vacuum)",
    code: "VC-30L",
    category: "Industrial Vacuum",
    warrantyMonths: 6,
    order: 9,
    active: true,
  },
];

// GET /api/admin/warranty-models
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const models = await WarrantyModel.find().sort({ order: 1, createdAt: 1 });

    return NextResponse.json({ success: true, models });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch warranty models";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/warranty-models
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    // Special Action: Restore sample default models
    if (data.action === "restore_defaults") {
      let restoredCount = 0;
      for (const item of DEFAULT_WARRANTY_MODELS) {
        const existing = await WarrantyModel.findOne({ name: item.name });
        if (!existing) {
          await WarrantyModel.create(item);
          restoredCount++;
        }
      }

      const updatedModels = await WarrantyModel.find().sort({ order: 1, createdAt: 1 });
      return NextResponse.json({
        success: true,
        message: `Restored ${restoredCount} default warranty models.`,
        models: updatedModels,
      });
    }

    // Special Action: Sync all products from Product catalog into warranty models
    if (data.action === "sync_from_products") {
      const catalogProducts = await Product.find();
      let addedCount = 0;

      for (const prod of catalogProducts) {
        const title = (prod.name || prod.model)?.trim();
        if (!title) continue;

        const displayName = prod.model && !prod.name.includes(prod.model)
          ? `${prod.model} (${prod.name})`
          : prod.name;

        const existing = await WarrantyModel.findOne({ name: displayName });
        if (!existing) {
          await WarrantyModel.create({
            name: displayName,
            code: prod.model || "",
            category: prod.category || "Catalog Products",
            warrantyMonths: 6,
            order: 50,
            active: true,
          });
          addedCount++;
        }
      }

      const updatedModels = await WarrantyModel.find().sort({ order: 1, createdAt: 1 });
      return NextResponse.json({
        success: true,
        message: `Synced ${addedCount} products into warranty models`,
        models: updatedModels,
      });
    }

    if (!data.name || !data.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Equipment model name is required" },
        { status: 400 }
      );
    }

    const trimmedName = data.name.trim();

    // Check for duplicate name (case-insensitive)
    const existing = await WarrantyModel.findOne({
      name: { $regex: new RegExp(`^${trimmedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `A model with the name "${existing.name}" already exists.` },
        { status: 400 }
      );
    }

    let newModel;
    try {
      newModel = await WarrantyModel.create({
        name: trimmedName,
        code: (data.code || "").trim(),
        category: (data.category || "Power Tools").trim(),
        warrantyMonths: Number(data.warrantyMonths) || 6,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      });
    } catch (err: any) {
      if (err.code === 11000) {
        return NextResponse.json(
          { success: false, error: `A model with the name "${trimmedName}" already exists.` },
          { status: 400 }
        );
      }
      throw err;
    }

    return NextResponse.json({ success: true, model: newModel }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create warranty model";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/warranty-models (Bulk operations)
export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json().catch(() => ({}));

    if (body.action === "delete_all") {
      const result = await WarrantyModel.deleteMany({});
      return NextResponse.json({
        success: true,
        message: `Successfully deleted all ${result.deletedCount} warranty models.`,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid delete action specified." },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete warranty models";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
