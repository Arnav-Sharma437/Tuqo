import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No invoice file uploaded" }, { status: 400 });
    }

    // Limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10MB limit. Please upload a smaller photo or PDF." },
        { status: 400 }
      );
    }

    const mimeType = file.type || (file.name.endsWith(".pdf") ? "application/pdf" : "image/jpeg");
    const isImage = mimeType.startsWith("image/");
    const isPdf = mimeType === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isImage && !isPdf) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a clear photo (JPG, PNG) or PDF of your invoice." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${mimeType};base64,${buffer.toString("base64")}`;

    if (isCloudinaryConfigured()) {
      const uploadResult = await cloudinary.uploader.upload(base64Data, {
        folder: "tuqo/warranty-invoices",
        resource_type: isPdf ? "auto" : "image",
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        fileName: file.name,
      });
    }

    // Fallback: If Cloudinary is temporarily unconfigured, store as data URI
    return NextResponse.json({
      success: true,
      url: base64Data,
      fileName: file.name,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to upload invoice";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
