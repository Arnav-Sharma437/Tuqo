import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: "Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing or incomplete.",
        configured: false,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }

  try {
    // Ping Cloudinary API securely using usage/ping call without uploading any files
    const pingResult = await cloudinary.api.ping();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully authenticated with Cloudinary API",
        configured: true,
        status: pingResult.status || "ok",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Cloudinary API ping failed";
    return NextResponse.json(
      {
        success: false,
        error: message,
        configured: true,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
