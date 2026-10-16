import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import ContactEnquiry from "@/models/ContactEnquiry";
import { sendContactNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    if (!data.fullName || !data.phone || !data.message) {
      return NextResponse.json(
        { success: false, error: "Name, phone number, and message are required" },
        { status: 400 }
      );
    }

    const newEnquiry = await ContactEnquiry.create({
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || "",
      enquiryType: data.enquiryType?.trim() || "Product Information",
      message: data.message.trim(),
      status: "New",
    });

    // Send email notification to mustafa.ahholdings@gmail.com
    try {
      await sendContactNotification(newEnquiry);
    } catch (emailErr) {
      console.error("Failed to send contact notification email:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully",
        enquiryId: newEnquiry._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Contact submission error:", error);
    const message = error instanceof Error ? error.message : "Failed to submit enquiry";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
