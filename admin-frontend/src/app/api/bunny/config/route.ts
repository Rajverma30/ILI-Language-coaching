import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const libraryId =
    process.env.BUNNY_STREAM_LIBRARY_ID ||
    process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID ||
    "";
  const apiKey = process.env.BUNNY_STREAM_API_KEY || "";
  const isConfigured = Boolean(libraryId && apiKey);

  return NextResponse.json({
    configured: isConfigured,
    libraryId: libraryId ? libraryId : undefined,
    hasApiKey: Boolean(apiKey),
    pullZone: process.env.BUNNY_STREAM_PULL_ZONE || "",
    message: isConfigured
      ? "Bunny Stream credentials configured and active."
      : "Bunny Stream credentials not fully configured in environment.",
  });
}

/**
 * Test connectivity with Bunny Stream using provided or environment credentials
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const libraryId =
      body.libraryId ||
      process.env.BUNNY_STREAM_LIBRARY_ID ||
      process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID;
    const apiKey = body.apiKey || process.env.BUNNY_STREAM_API_KEY;

    if (!libraryId || !apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Both Bunny Library ID and Stream API Key are required to test connection.",
        },
        { status: 400 }
      );
    }

    // Call Bunny Stream library info endpoint to verify credentials
    const response = await fetch(
      `https://video.bunnycdn.com/library/${libraryId}/videos?page=1&itemsPerPage=1`,
      {
        method: "GET",
        headers: {
          AccessKey: apiKey,
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        success: true,
        message: "Successfully connected to Bunny Stream CDN!",
        totalVideos: data.totalItems || 0,
      });
    }

    const errText = await response.text();
    return NextResponse.json(
      {
        success: false,
        error: `Bunny Stream Authentication failed (${response.status}): ${errText}`,
      },
      { status: response.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to connect to Bunny Stream",
      },
      { status: 500 }
    );
  }
}
