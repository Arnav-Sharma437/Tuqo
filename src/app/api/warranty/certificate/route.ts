import { NextRequest, NextResponse } from "next/server";
import { generateWarrantyCertificatePdf, WarrantyCertificateData } from "@/lib/warrantyPdf";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as WarrantyCertificateData;

    if (!body || !body.registrationId || !body.customerName) {
      return NextResponse.json(
        { success: false, error: "Missing required warranty fields" },
        { status: 400 }
      );
    }

    const pdfBytes = await generateWarrantyCertificatePdf(body);
    const filename = `TUQO-Warranty-${body.registrationId}.pdf`;

    return new Response(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    console.error("PDF POST error:", err);
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
