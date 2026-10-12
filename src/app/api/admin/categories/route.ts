import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Category from "@/models/Category";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/admin/categories
export async function GET() {
  try {
    await connectToDatabase();
    const dbCategories = await Category.find().sort({ order: 1, createdAt: 1 }).lean();

    // Default static system categories to ensure dropdowns always have full equipment lists
    const defaultCategories = [
      { name: "High Pressure Washer", slug: "high-pressure-washer", image: "/images/cat-pressure-washer.png", order: 1, featured: true },
      { name: "Air Compressor", slug: "air-compressor", image: "/images/cat-air-compressor.png", order: 2, featured: true },
      { name: "Power Tools", slug: "power-tools", image: "/images/cat-power-tools.png", order: 3, featured: true },
      { name: "High Pressure Washer Accessories", slug: "high-pressure-washer-accessories", image: "/images/cat-accessories.png", order: 4, featured: true },
      { name: "Auto Detailing", slug: "auto-detailing", image: "/images/cat-foam-dispenser.png", order: 5, featured: true },
      { name: "Power Tools Accessories", slug: "power-tools-accessories", image: "/images/cat-accessories.png", order: 6, featured: true },
      { name: "Vacuum Cleaner", slug: "vacuum-cleaner", image: "/images/cat-pressure-washer.png", order: 7, featured: true },
      { name: "Foam Dispenser", slug: "foam-dispenser", image: "/images/cat-foam-dispenser.png", order: 8, featured: true },
    ];

    const map = new Map<string, any>();
    defaultCategories.forEach((c) => map.set(c.slug, c));
    dbCategories.forEach((c: any) => map.set(c.slug, c));

    return NextResponse.json({ success: true, categories: Array.from(map.values()) });
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
