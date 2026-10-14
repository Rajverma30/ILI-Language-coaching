import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const instanceId =
      body.instanceId || process.env.ULTRAMSG_INSTANCE_ID || "";
    const token = body.token || process.env.ULTRAMSG_TOKEN || "";
    const phone =
      body.phone || process.env.ADMIN_WHATSAPP_PHONE || "";

    if (!instanceId || !token) {
      return NextResponse.json(
        { success: false, error: "Instance ID and Token are required." },
        { status: 400 }
      );
    }

    // Format phone number
    let cleanPhone = String(phone).trim().replace(/[^\d+]/g, "");
    if (cleanPhone.startsWith("+")) cleanPhone = cleanPhone.substring(1);
    if (cleanPhone.length === 11 && cleanPhone.startsWith("0"))
      cleanPhone = cleanPhone.substring(1);
    if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;
    const targetPhone = `+${cleanPhone}`;

    const params = new URLSearchParams();
    params.append("token", token);
    params.append("to", targetPhone);
    params.append(
      "body",
      "ILI Foreign Languages Institute: UltraMsg WhatsApp connection verified successfully! 🚀"
    );

    const res = await fetch(
      `https://api.ultramsg.com/${instanceId}/messages/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const data = await res.json().catch(() => null);

    if (
      res.ok &&
      data &&
      (data.sent === "true" || data.sent === true || data.id)
    ) {
      return NextResponse.json({
        success: true,
        message: `Test WhatsApp message successfully sent to ${targetPhone}! (Msg ID: ${data.id})`,
        data,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error:
          (data && (data.error || data.message)) ||
          `UltraMsg API error (status ${res.status})`,
        details: data,
      },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to reach UltraMsg API",
      },
      { status: 500 }
    );
  }
}
