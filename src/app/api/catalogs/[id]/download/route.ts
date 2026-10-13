import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Catalog from "@/models/Catalog";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const catalog = await Catalog.findById(id).lean();
    if (!catalog || !catalog.pdfUrl) {
      return NextResponse.json({ error: "Catalogue PDF not found" }, { status: 404 });
    }

    const url = catalog.pdfUrl;

    // If hosted on Cloudinary, generate authorized signed download URL to bypass ACL restriction
    if (url.includes("cloudinary.com") && isCloudinaryConfigured()) {
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
      const publicId = match ? decodeURIComponent(match[1]) : "";

      if (publicId) {
        const downloadUrl = cloudinary.utils.private_download_url(
          publicId,
          "",
          {
            resource_type: "raw",
            type: "upload",
          }
        );

        return NextResponse.redirect(downloadUrl);
      }
    }

    // Direct redirect fallback
    return NextResponse.redirect(url);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Download failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
