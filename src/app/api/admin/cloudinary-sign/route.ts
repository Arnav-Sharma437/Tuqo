import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        { success: false, error: "Cloudinary credentials are not configured on server" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const folder = body.folder || "tuqo/general";
    const targetFolder = folder.startsWith("tuqo") ? folder : `tuqo/${folder}`;
    const timestamp = Math.round(Date.now() / 1000);

    const paramsToSign: Record<string, string | number> = {
      folder: targetFolder,
      timestamp,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      folder: targetFolder,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to sign Cloudinary request";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
