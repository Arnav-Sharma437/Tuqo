import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Product from "@/models/Product";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/admin/products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/products
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.slug || !data.category || !data.categorySlug || !data.image) {
      return NextResponse.json(
        { success: false, error: "Name, slug, category, categorySlug, and image are required" },
        { status: 400 }
      );
    }

    const existing = await Product.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A product with this slug already exists" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name: data.name,
      slug: data.slug,
      model: data.model || "",
      category: data.category,
      categorySlug: data.categorySlug,
      subcategory: data.subcategory || "",
      subcategorySlug: data.subcategorySlug || "",
      image: data.image,
      images: Array.isArray(data.images) ? data.images : [],
      shortDesc: data.shortDesc || "",
      description: data.description || "",
      tag: data.tag || "",
      features: Array.isArray(data.features) ? data.features : [],
      specs: Array.isArray(data.specs) ? data.specs : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      inStock: data.inStock !== undefined ? Boolean(data.inStock) : true,
      featured: data.featured !== undefined ? Boolean(data.featured) : false,
      order: Number(data.order) || 0,
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create product";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
