import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ success: false, error: "Not configured" }, { status: 500 });
  }

  try {
    const existingRawUrl = "https://res.cloudinary.com/dnm67cqe/raw/upload/v1791875525/tuqo/catalogs/jsysceghaapab6di8asp.pdf";
    const publicId = "tuqo/catalogs/jsysceghaapab6di8asp";

    // Method 1: Signed delivery URL
    const signedRawUrl = cloudinary.url(publicId + ".pdf", {
      resource_type: "raw",
      sign_url: true,
      secure: true,
    });

    const testSignedRes = await fetch(signedRawUrl);

    // Method 2: Test uploading a dummy PDF as resource_type: "image" with format "pdf"
    const dummyPdf = Buffer.from("%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\nxref\n0 4\n0000000000 65535 f\n0000000010 00000 n\n0000000053 00000 n\n0000000102 00000 n\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n149\n%%EOF");
    const base64Data = "data:application/pdf;base64," + dummyPdf.toString("base64");

    const imgUpload = await cloudinary.uploader.upload(base64Data, {
      folder: "tuqo/test",
      resource_type: "image",
      format: "pdf",
    });

    const testImgRes = await fetch(imgUpload.secure_url);

    return NextResponse.json({
      method1_signed_raw: {
        url: signedRawUrl,
        status: testSignedRes.status,
      },
      method2_image_pdf: {
        url: imgUpload.secure_url,
        status: testImgRes.status,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Test failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
