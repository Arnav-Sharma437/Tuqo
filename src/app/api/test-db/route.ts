import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mongoose = await connectToDatabase();
    const readyState = mongoose.connection.readyState;
    const dbName = mongoose.connection.db?.databaseName;

    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    const stateMap: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };

    return NextResponse.json(
      {
        success: true,
        message: "Successfully connected to MongoDB Atlas",
        database: dbName,
        connectionState: stateMap[readyState] || "unknown",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json(
      {
        success: false,
        error: message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
