import crypto from "crypto";
import { config } from "../config";

export class BunnyService {
  /**
   * Generates a signed Bunny Stream token if tokenAuthKey is configured.
   * Format: https://player.mediadelivery.net/embed/{video_library_id}/{video_id}?token={token}&expires={expires}
   * Never exposes security keys to the client.
   */
  static getEmbedConfig(videoId: string): {
    configured: boolean;
    libraryId?: string;
    videoId?: string;
    embedUrl?: string;
    token?: string;
    expires?: number;
    error?: string;
  } {
    const libraryId = config.bunnyStream.libraryId;
    const tokenKey = config.bunnyStream.tokenAuthKey;

    if (!libraryId || !videoId) {
      return {
        configured: false,
        error: "Bunny Stream library ID or video ID is not configured.",
      };
    }

    if (tokenKey) {
      // Expiration timestamp 4 hours from now
      const expires = Math.floor(Date.now() / 1000) + 4 * 3600;
      // Bunny Stream token format: sha256(tokenSecurityKey + videoId + expirationTime)
      const token = crypto
        .createHash("sha256")
        .update(tokenKey + videoId + expires)
        .digest("hex");

      const embedUrl = `https://player.mediadelivery.net/embed/${libraryId}/${videoId}?token=${token}&expires=${expires}`;

      return {
        configured: true,
        libraryId,
        videoId,
        embedUrl,
        token,
        expires,
      };
    }

    // Standard public embed without token authentication
    const embedUrl = `https://player.mediadelivery.net/embed/${libraryId}/${videoId}`;
    return {
      configured: true,
      libraryId,
      videoId,
      embedUrl,
    };
  }

  /**
   * Creates a new video slot on Bunny Stream
   */
  static async createVideoSlot(title: string): Promise<{
    success: boolean;
    videoId?: string;
    libraryId?: string;
    error?: string;
  }> {
    const libraryId = config.bunnyStream.libraryId;
    const apiKey = config.bunnyStream.apiKey;

    if (!libraryId || !apiKey) {
      return {
        success: false,
        error: "BUNNY_STREAM_LIBRARY_ID or BUNNY_STREAM_API_KEY is not configured.",
      };
    }

    try {
      const res = await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
        method: "POST",
        headers: {
          AccessKey: apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: `Bunny Stream API error (${res.status}): ${text}` };
      }

      const data = (await res.json()) as { guid: string };
      return {
        success: true,
        videoId: data.guid,
        libraryId,
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to create video slot" };
    }
  }

  /**
   * Tests connectivity to Bunny Stream API
   */
  static async testConnection(): Promise<{
    success: boolean;
    totalVideos?: number;
    error?: string;
  }> {
    const libraryId = config.bunnyStream.libraryId;
    const apiKey = config.bunnyStream.apiKey;

    if (!libraryId || !apiKey) {
      return {
        success: false,
        error: "BUNNY_STREAM_LIBRARY_ID or BUNNY_STREAM_API_KEY is not configured.",
      };
    }

    try {
      const res = await fetch(
        `https://video.bunnycdn.com/library/${libraryId}/videos?page=1&itemsPerPage=1`,
        {
          headers: {
            AccessKey: apiKey,
            Accept: "application/json",
          },
        }
      );

      if (res.ok) {
        const data = (await res.json()) as { totalItems?: number };
        return { success: true, totalVideos: data.totalItems || 0 };
      }

      const text = await res.text();
      return { success: false, error: `Authentication failed (${res.status}): ${text}` };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  }
}
