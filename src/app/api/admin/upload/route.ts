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
        { success: false, error: "Cloudinary credentials are not configured on the server." },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "tuqo/general";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64 buffer for Cloudinary uploader
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Ensure folder is prefixed with tuqo/
    const targetFolder = folder.startsWith("tuqo") ? folder : `tuqo/${folder}`;

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      folder: targetFolder,
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Image upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
