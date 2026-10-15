import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import Faq from "@/models/Faq";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const DEFAULT_FAQS = [
  {
    question: "What warranty and service coverage is provided with TUQO equipment?",
    answer: "All TUQO industrial machines undergo rigorous multi-stage quality control checks and come with standard manufacturer warranty covering core motor assemblies and manufacturing defects. Our technical service center in Coimbatore supplies genuine spares and servicing.",
    order: 1,
    active: true,
  },
  {
    question: "Are genuine replacement parts and accessories easily available?",
    answer: "Yes. We maintain a complete inventory of OEM spare parts including brass pump seals, induction armatures, high-pressure reinforced hoses, foam cannon head units, HEPA filters, and carbon brushes for immediate dispatch.",
    order: 2,
    active: true,
  },
  {
    question: "Can I use TUQO high-pressure washers for commercial car wash bays?",
    answer: "Absolutely. Our commercial-grade washers are engineered with heavy-duty induction copper motors and high-flow brass pump heads designed specifically for extended duty cycles in professional automotive detailing centers and workshops.",
    order: 3,
    active: true,
  },
  {
    question: "How can I become an authorized dealer or place bulk industrial orders?",
    answer: "You can reach our corporate desk at A.H HOLDINGS directly via WhatsApp (+91 93424 66860) or visit our facility in Sidco Industrial Estate, Coimbatore to discuss distributorship terms and bulk machinery procurement.",
    order: 4,
    active: true,
  },
];

// GET /api/admin/faqs
export async function GET() {
  try {
    await connectToDatabase();
    let faqs = await Faq.find().sort({ order: 1, createdAt: 1 });

    // Seed defaults only on initial first run if DB collection has never been initialized
    if (faqs.length === 0) {
      await Faq.insertMany(DEFAULT_FAQS);
      faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
    }

    return NextResponse.json({ success: true, faqs });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch FAQs";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

// POST /api/admin/faqs
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const data = await req.json();

    if (!data.question || !data.answer) {
      return NextResponse.json(
        { success: false, error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const faq = await Faq.create({
      question: data.question.trim(),
      answer: data.answer.trim(),
      order: Number(data.order) || 0,
      active: data.active !== undefined ? Boolean(data.active) : true,
    });

    return NextResponse.json({ success: true, faq }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create FAQ";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
