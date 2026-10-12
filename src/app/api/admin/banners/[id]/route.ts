import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Banner from "@/models/Banner";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/banners/[id]
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

    const banner = await Banner.findByIdAndUpdate(
      id,
      {
        title: data.title,
        subtitle: data.subtitle,
        badge: data.badge,
        desktopImage: data.desktopImage,
        mobileImage: data.mobileImage,
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        active: data.active,
        order: Number(data.order) || 0,
      },
      { new: true }
    );

    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, banner });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update banner";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/banners/[id]
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
    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return NextResponse.json({ success: false, error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Banner deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete banner";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
