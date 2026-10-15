import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Banner from "@/models/Banner";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/admin/banners
export async function GET() {
  try {
    await connectToDatabase();
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, banners });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch banners";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/banners
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    if (!data.desktopImage) {
      return NextResponse.json(
        { success: false, error: "Desktop banner image is required" },
        { status: 400 }
      );
    }

    const banner = await Banner.create({
      title: data.title || "Banner",
      subtitle: data.subtitle || "",
      badge: data.badge || "",
      desktopImage: data.desktopImage,
      mobileImage: data.mobileImage || data.desktopImage,
      buttonText: data.buttonText || "",
      buttonLink: data.buttonLink || "",
      active: data.active !== undefined ? Boolean(data.active) : true,
      order: Number(data.order) || 0,
    });

    return NextResponse.json({ success: true, banner }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create banner";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
