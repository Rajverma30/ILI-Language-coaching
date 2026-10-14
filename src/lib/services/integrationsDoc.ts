/**
 * Integration Boundaries & Architectural Specifications for ILI Language Platform
 * 
 * Target Integrations to be connected when Production Credentials are provided:
 * 1. MongoDB Atlas (Database)
 * 2. Bunny Stream (HLS Video CDN & Token Authentication)
 * 3. Razorpay (Checkout, Webhooks, Signature Verification)
 * 4. WhatsApp Business Cloud API (Automated Admission & Demo Confirmations)
 */

export interface BunnyStreamConfig {
  libraryId: string;
  apiKey: string;
  pullZoneUrl: string;
  tokenSecurityKey: string;
}

/**
 * Bunny Stream Video Delivery Architecture:
 * - Direct video files are NEVER exposed to the client.
 * - Server creates a signed HLS URL with an expiry timestamp (e.g., 2 hours).
 * - Format: https://{pullZone}.b-cdn.net/{videoId}/playlist.m3u8?token={sha256Token}&expires={timestamp}
 */
export async function generateBunnySecureStreamUrl(
  _videoId: string,
  _userSessionId: string
): Promise<{ streamUrl?: string; error?: string; isDemo: boolean }> {
  // Demo mode: Return placeholder notification
  return {
    isDemo: true,
    error: "Bunny Stream credentials not configured in environment. Displaying interactive demo video player with sample lesson curriculum.",
  };
}

/**
 * Razorpay Payment Gateway Specification:
 * - Client initiates order via POST /api/checkout/order
 * - Server calls Razorpay Orders API: razorpay.orders.create({ amount, currency: 'INR', receipt })
 * - Client handles payment modal via Razorpay Checkout SDK
 * - Server verifies HMAC SHA256 signature using RAZORPAY_KEY_SECRET:
 *   crypto.createHmac('sha256', secret).update(order_id + '|' + payment_id).digest('hex')
 */
export async function verifyRazorpaySignature(
  _orderId: string,
  _paymentId: string,
  _signature: string
): Promise<{ verified: boolean; isDemo: boolean }> {
  return {
    verified: false,
    isDemo: true,
  };
}

/**
 * WhatsApp Business Cloud API Specification:
 * - Triggers templated message on Demo Request submission
 * - Endpoint: https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages
 * - Template: 'ili_demo_confirmation_indore'
 */
export async function sendWhatsAppNotification(
  _recipientPhone: string,
  _templateName: string,
  _parameters: Record<string, string>
): Promise<{ dispatched: boolean; isDemo: boolean }> {
  return {
    dispatched: false,
    isDemo: true,
  };
}
