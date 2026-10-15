import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { getAdminSession } from "@/lib/auth";
import WarrantyRegistration from "@/models/WarrantyRegistration";

export const dynamic = "force-dynamic";

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
    await dbConnect();
    const body = await req.json();

    const allowedFields = ["status", "notes", "warrantyExpiryDate"];
    const updateFields: Record<string, any> = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateFields[key] = body[key];
      }
    }

    const updated = await WarrantyRegistration.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Warranty record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, warranty: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update warranty";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const deleted = await WarrantyRegistration.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Warranty record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Warranty record deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete warranty";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
