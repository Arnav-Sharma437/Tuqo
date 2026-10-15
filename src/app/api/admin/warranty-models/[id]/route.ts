import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import WarrantyModel from "@/models/WarrantyModel";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/warranty-models/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const data = await req.json();

    const updatePayload: Record<string, any> = {};
    if (data.name !== undefined) updatePayload.name = data.name.trim();
    if (data.code !== undefined) updatePayload.code = data.code.trim();
    if (data.category !== undefined) updatePayload.category = data.category.trim();
    if (data.warrantyMonths !== undefined) updatePayload.warrantyMonths = Number(data.warrantyMonths) || 6;
    if (data.order !== undefined) updatePayload.order = Number(data.order) || 0;
    if (data.active !== undefined) updatePayload.active = Boolean(data.active);

    const model = await WarrantyModel.findByIdAndUpdate(
      id,
      updatePayload,
      { new: true }
    );

    if (!model) {
      return NextResponse.json({ success: false, error: "Warranty model not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, model });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update warranty model";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/warranty-models/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const model = await WarrantyModel.findByIdAndDelete(id);
    if (!model) {
      return NextResponse.json({ success: false, error: "Warranty model not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Warranty model deleted" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete warranty model";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
