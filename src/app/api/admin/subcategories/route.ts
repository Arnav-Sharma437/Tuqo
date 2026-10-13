import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Subcategory from "@/models/Subcategory";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/admin/subcategories
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get("categorySlug");

    const query = categorySlug ? { categorySlug } : {};
    const subcategories = await Subcategory.find(query).sort({ order: 1, createdAt: 1 });

    return NextResponse.json({ success: true, subcategories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch subcategories";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/subcategories
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.slug || !data.categorySlug) {
      return NextResponse.json(
        { success: false, error: "Name, slug, and parent category are required" },
        { status: 400 }
      );
    }

    const existing = await Subcategory.findOne({
      categorySlug: data.categorySlug,
      slug: data.slug,
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "A subcategory with this slug already exists under this category" },
        { status: 400 }
      );
    }

    const subcategory = await Subcategory.create({
      name: data.name,
      slug: data.slug,
      categorySlug: data.categorySlug,
      categoryName: data.categoryName || data.categorySlug,
      image: data.image || "",
      description: data.description || "",
      order: Number(data.order) || 0,
      active: data.active !== undefined ? Boolean(data.active) : true,
    });

    return NextResponse.json({ success: true, subcategory }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create subcategory";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
