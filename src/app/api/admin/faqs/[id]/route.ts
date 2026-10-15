import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Faq from "@/models/Faq";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// PUT /api/admin/faqs/[id]
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const data = await req.json();

    const faq = await Faq.findByIdAndUpdate(
      id,
      {
        question: data.question?.trim(),
        answer: data.answer?.trim(),
        order: Number(data.order) || 0,
        active: data.active !== undefined ? Boolean(data.active) : true,
      },
      { new: true }
    );

    if (!faq) {
      return NextResponse.json({ success: false, error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, faq });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update FAQ";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// DELETE /api/admin/faqs/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();

    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) {
      return NextResponse.json({ success: false, error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "FAQ deleted permanently" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete FAQ";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
