import { NextResponse } from "next/server"
import { isEmailConfigured } from "@/lib/env"

export async function GET() {
  try {
    const configured = isEmailConfigured()

    return NextResponse.json({
      configured,
      service: "resend",
      status: configured ? "operational" : "development-mode",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        configured: false,
        error: "Configuration check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
