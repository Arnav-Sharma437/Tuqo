import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Subcategory from "@/models/Subcategory";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/subcategories/[id]
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

    const subcategory = await Subcategory.findByIdAndUpdate(
      id,
      {
        name: data.name,
        slug: data.slug,
        categorySlug: data.categorySlug,
        categoryName: data.categoryName,
        image: data.image,
        description: data.description,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
      { new: true }
    );

    if (!subcategory) {
      return NextResponse.json({ success: false, error: "Subcategory not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, subcategory });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update subcategory";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/subcategories/[id]
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
    const subcategory = await Subcategory.findByIdAndDelete(id);

    if (!subcategory) {
      return NextResponse.json({ success: false, error: "Subcategory not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Subcategory deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete subcategory";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
