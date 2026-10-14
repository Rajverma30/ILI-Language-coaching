import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 300; // Allow 5 minutes for large video uploads if supported

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title =
      (formData.get("title") as string) ||
      file?.name ||
      `Lesson Video ${new Date().toLocaleDateString()}`;

    // Read credentials from request body (e.g. from local admin settings) or environment
    const libraryId =
      (formData.get("libraryId") as string) ||
      process.env.BUNNY_STREAM_LIBRARY_ID ||
      process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID ||
      "";

    const apiKey =
      (formData.get("apiKey") as string) ||
      process.env.BUNNY_STREAM_API_KEY ||
      "";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No video file provided." },
        { status: 400 }
      );
    }

    // If Bunny credentials are not configured, return an honest demo mock payload
    if (!libraryId || !apiKey) {
      const mockGuid = `demo-bunny-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
      return NextResponse.json({
        success: true,
        isDemo: true,
        videoId: mockGuid,
        title,
        fileName: file.name,
        fileSize: file.size,
        message:
          "Bunny Stream API Key or Library ID is not configured yet. A simulated video ID has been created for testing. Add your Bunny API Key in Settings to enable real cloud uploads.",
      });
    }

    // 1. Create Video Object in Bunny Stream
    const createRes = await fetch(
      `https://video.bunnycdn.com/library/${libraryId}/videos`,
      {
        method: "POST",
        headers: {
          AccessKey: apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    if (!createRes.ok) {
      const errText = await createRes.text();
      return NextResponse.json(
        {
          success: false,
          error: `Bunny Stream slot creation failed (${createRes.status}): ${errText}`,
        },
        { status: createRes.status }
      );
    }

    const createData = await createRes.json();
    const videoId = createData.guid;

    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          error: "Bunny Stream did not return a valid video GUID.",
        },
        { status: 500 }
      );
    }

    // 2. Upload Video Binary Data to Bunny Stream
    const fileBuffer = await file.arrayBuffer();
    const uploadRes = await fetch(
      `https://video.bunnycdn.com/library/${libraryId}/videos/${videoId}`,
      {
        method: "PUT",
        headers: {
          AccessKey: apiKey,
          "Content-Type": "application/octet-stream",
        },
        body: fileBuffer,
      }
    );

    if (!uploadRes.ok) {
      const errText = await uploadRes.text();
      return NextResponse.json(
        {
          success: false,
          error: `Bunny Stream binary upload failed (${uploadRes.status}): ${errText}`,
        },
        { status: uploadRes.status }
      );
    }

    // Upload succeeded
    return NextResponse.json({
      success: true,
      isDemo: false,
      videoId,
      title,
      libraryId,
      fileName: file.name,
      fileSize: file.size,
      embedUrl: `https://player.mediadelivery.net/embed/${libraryId}/${videoId}`,
      message: "Video successfully uploaded to Bunny Stream CDN!",
    });
  } catch (err: any) {
    console.error("Bunny Stream direct upload route error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to process video upload.",
      },
      { status: 500 }
    );
  }
}
