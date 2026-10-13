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

    // Calculate human-friendly file size
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const formattedSize =
      file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`;

    // Convert file to base64 buffer for Cloudinary uploader
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || (file.name.endsWith(".pdf") ? "application/pdf" : "image/jpeg");
    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

    // Ensure folder is prefixed with tuqo/
    const targetFolder = folder.startsWith("tuqo") ? folder : `tuqo/${folder}`;

    const isPdf = file.name.toLowerCase().endsWith(".pdf") || mimeType === "application/pdf";

    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      folder: targetFolder,
      resource_type: isPdf ? "auto" : "image",
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format || (isPdf ? "pdf" : "jpg"),
      fileSize: formattedSize,
      fileName: file.name,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Image upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
