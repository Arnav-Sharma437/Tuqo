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

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: data.name,
        slug: data.slug,
        model: data.model,
        category: data.category,
        categorySlug: data.categorySlug,
        image: data.image,
        images: Array.isArray(data.images) ? data.images : [],
        shortDesc: data.shortDesc,
        description: data.description,
        tag: data.tag,
        features: Array.isArray(data.features) ? data.features : [],
        specs: Array.isArray(data.specs) ? data.specs : [],
        applications: Array.isArray(data.applications) ? data.applications : [],
        inStock: data.inStock,
        featured: data.featured,
        order: Number(data.order) || 0,
      },
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
