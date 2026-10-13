import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Catalog from "@/models/Catalog";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/catalogs/[id]
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

    const catalog = await Catalog.findByIdAndUpdate(
      id,
      {
        title: data.title,
        description: data.description,
        pdfUrl: data.pdfUrl,
        coverImage: data.coverImage,
        fileSize: data.fileSize,
        category: data.category,
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
      { new: true }
    );

    if (!catalog) {
      return NextResponse.json({ success: false, error: "Catalog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, catalog });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update catalog";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/catalogs/[id]
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
    const catalog = await Catalog.findByIdAndDelete(id);

    if (!catalog) {
      return NextResponse.json({ success: false, error: "Catalog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Catalog deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete catalog";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
