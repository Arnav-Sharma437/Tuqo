import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ success: false, error: "Cloudinary not configured" }, { status: 500 });
  }

  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "tuqo/test";

    // 1. Generate signature
    const paramsToSign = { folder, timestamp };
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );

    // 2. Perform direct REST upload as raw
    const dummyPdf = Buffer.from("%PDF-1.4\n%EOF");
    const formData = new FormData();
    formData.append("file", new Blob([dummyPdf], { type: "application/pdf" }), "sample.pdf");
    formData.append("api_key", process.env.CLOUDINARY_API_KEY as string);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("folder", folder);

    // Try raw/upload
    const rawRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const rawData = await rawRes.json();

    return NextResponse.json({
      success: rawRes.ok,
      status: rawRes.status,
      rawData,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Test failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
