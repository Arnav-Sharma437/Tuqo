import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Catalog from "@/models/Catalog";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Default starter catalogues to prepopulate if database collection is empty
const DEFAULT_CATALOGUES = [
  {
    title: "TUQO PRODUCT CATALOG 2025",
    description: "Complete range of professional machinery, high pressure washers, air compressors and power tools.",
    coverImage: "/images/hero-banner-bg.png",
    category: "Machinery & Power Tools",
    pdfUrl: "",
    fileSize: "",
    order: 1,
    active: true,
  },
  {
    title: "TUQO CLEANING EQUIPMENT ACCESSORIES 2025",
    description: "Explore our range of high pressure washer accessories, cleaning equipment and car detailing products.",
    coverImage: "/images/cat-accessories.png",
    category: "Accessories",
    pdfUrl: "",
    fileSize: "",
    order: 2,
    active: true,
  },
  {
    title: "TUQO AUTO DETAILING AND CLEANING 2025",
    description: "Discover our professional auto detailing and vehicle cleaning equipment range.",
    coverImage: "/images/cat-foam-dispenser.png",
    category: "Auto Detailing",
    pdfUrl: "",
    fileSize: "",
    order: 3,
    active: true,
  },
];

// GET /api/admin/catalogs
export async function GET() {
  try {
    await connectToDatabase();
    const catalogs = await Catalog.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, catalogs });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch catalogs";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/catalogs
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    if (!data.title) {
      return NextResponse.json({ success: false, error: "Catalog title is required" }, { status: 400 });
    }

    const catalog = await Catalog.create({
      title: data.title,
      description: data.description || "",
      pdfUrl: data.pdfUrl || "",
      coverImage: data.coverImage || "",
      fileSize: data.fileSize || "",
      category: data.category || "General",
      order: Number(data.order) || 0,
      active: data.active !== undefined ? Boolean(data.active) : true,
    });

    return NextResponse.json({ success: true, catalog }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create catalog";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
