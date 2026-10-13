import { NextResponse } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ success: false, error: "Not configured" }, { status: 500 });
  }

  try {
    const publicId = "tuqo/catalogs/jsysceghaapab6di8asp";

    // Method 3: private_download_url
    const privateUrl = cloudinary.utils.private_download_url(
      publicId,
      "pdf",
      {
        resource_type: "raw",
        type: "upload",
      }
    );

    const testPrivateRes = await fetch(privateUrl);

    // Method 4: Authenticated REST API call
    const authHeader = Buffer.from(
      `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
    ).toString("base64");

    const apiRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/raw/upload/${publicId}`,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      }
    );
    const apiData = await apiRes.json();

    return NextResponse.json({
      method3_private_download_url: {
        url: privateUrl,
        status: testPrivateRes.status,
      },
      method4_api: {
        status: apiRes.status,
        url: apiData.secure_url,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Test failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
