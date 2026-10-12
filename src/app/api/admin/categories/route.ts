import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Category from "@/models/Category";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/admin/categories
export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, categories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch categories";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/categories
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.slug || !data.image) {
      return NextResponse.json(
        { success: false, error: "Category name, slug, and image are required" },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Category with this slug already exists" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: data.name,
      slug: data.slug,
      image: data.image,
      description: data.description || "",
      order: Number(data.order) || 0,
      featured: data.featured !== undefined ? Boolean(data.featured) : true,
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create category";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
