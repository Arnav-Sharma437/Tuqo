import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db/mongodb";
import AdminUser from "@/models/AdminUser";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = String(email).trim().toLowerCase();

    // Check if an admin exists, or bootstrap initial admin if database has none
    const adminCount = await AdminUser.countDocuments();
    let user = await AdminUser.findOne({ email: normalizedEmail });

    if (adminCount === 0) {
      // First time bootstrap with initial password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      user = await AdminUser.create({
        email: normalizedEmail,
        passwordHash,
        name: "Tuqo Admin",
        role: "admin",
      });
    } else if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    } else {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: "Invalid credentials" },
          { status: 401 }
        );
      }
    }

    const token = await signAdminToken({
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { email: user.email, name: user.name },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
