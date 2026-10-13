import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ success: false, error: "Not configured" }, { status: 500 });
  }

  try {
    const publicId = "tuqo/catalogs/jsysceghaapab6di8asp.pdf";
    const resource = await cloudinary.api.resource(publicId, { resource_type: "raw" });

    // Method: download_archive_url or private_download_url with correct public_id
    const downloadUrl = cloudinary.utils.private_download_url(
      publicId,
      "",
      {
        resource_type: "raw",
        type: "upload",
      }
    );

    const testFetch = await fetch(downloadUrl);

    return NextResponse.json({
      resourceFound: !!resource,
      bytes: resource.bytes,
      format: resource.format,
      downloadUrl,
      downloadStatus: testFetch.status,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Test failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
