import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/products/[id]
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

    const updateFields: Record<string, any> = {};
    if (data.name !== undefined) updateFields.name = data.name;
    if (data.slug !== undefined) updateFields.slug = data.slug;
    if (data.model !== undefined) updateFields.model = data.model;
    if (data.category !== undefined) updateFields.category = data.category;
    if (data.categorySlug !== undefined) updateFields.categorySlug = data.categorySlug;
    if (data.subcategory !== undefined) updateFields.subcategory = data.subcategory;
    if (data.subcategorySlug !== undefined) updateFields.subcategorySlug = data.subcategorySlug;
    if (data.image !== undefined) updateFields.image = data.image;
    if (data.images !== undefined) updateFields.images = Array.isArray(data.images) ? data.images : [];
    if (data.shortDesc !== undefined) updateFields.shortDesc = data.shortDesc;
    if (data.description !== undefined) updateFields.description = data.description;
    if (data.tag !== undefined) updateFields.tag = data.tag;
    if (data.features !== undefined) updateFields.features = Array.isArray(data.features) ? data.features : [];
    if (data.specs !== undefined) updateFields.specs = Array.isArray(data.specs) ? data.specs : [];
    if (data.applications !== undefined) updateFields.applications = Array.isArray(data.applications) ? data.applications : [];
    if (data.inStock !== undefined) updateFields.inStock = data.inStock;
    if (data.featured !== undefined) updateFields.featured = data.featured;
    if (data.order !== undefined) updateFields.order = Number(data.order) || 0;

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update product";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/products/[id]
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
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete product";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
