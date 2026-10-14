import querystring from "querystring";
import https from "https";
import { config } from "../config";
import { Lead } from "../models/types";

/**
 * Normalizes any phone number input into international WhatsApp format (e.g. +91XXXXXXXXXX)
 */
export function formatWhatsAppNumber(phone: string): string {
  if (!phone) return "";
  let cleaned = String(phone).trim().replace(/[^\d+]/g, "");

  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }

  // If 11 digits starting with 0 (e.g. 09826012345 in India), drop the 0
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }

  // If standard 10-digit Indian mobile number, add 91
  if (cleaned.length === 10) {
    cleaned = `91${cleaned}`;
  }

  return `+${cleaned}`;
}

export class UltraMsgService {
  // Global deduplication cache to prevent any duplicate notifications within 30 seconds
  private static recentLeadsMap = new Map<string, number>();

  /**
   * Sends a WhatsApp text message via UltraMsg API
   */
  static async sendMessage(
    to: string,
    body: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const instanceId = config.ultraMsg.instanceId;
    const token = config.ultraMsg.token;

    if (!instanceId || !token) {
      console.warn("[UltraMsg] ⚠️ Credentials missing (instanceId or token not set).");
      return { success: false, error: "UltraMsg credentials not configured" };
    }

    const formattedTo = formatWhatsAppNumber(to);
    if (!formattedTo || formattedTo.length < 10) {
      console.warn(`[UltraMsg] ⚠️ Invalid phone number for WhatsApp: "${to}"`);
      return { success: false, error: "Invalid recipient phone number" };
    }

    // UltraMsg expects international digits WITHOUT leading + sign (e.g. 919826012345)
    const ultraMsgTo = formattedTo.replace(/^\+/, "");

    const postData = querystring.stringify({
      token,
      to: ultraMsgTo,
      body,
    });

    const options: https.RequestOptions = {
      method: "POST",
      hostname: "api.ultramsg.com",
      port: 443,
      path: `/${instanceId}/messages/chat`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "content-length": Buffer.byteLength(postData),
      },
      timeout: 10000,
    };

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on("data", (chunk) => {
          chunks.push(chunk);
        });

        res.on("end", () => {
          const raw = Buffer.concat(chunks).toString();
          try {
            const parsed = JSON.parse(raw);
            if (parsed.sent === "true" || parsed.sent === true || parsed.id) {
              console.log(
                `[UltraMsg] ✅ WhatsApp message dispatched instantly to ${formattedTo} (ID: ${parsed.id})`
              );
              resolve({ success: true, data: parsed });
            } else {
              console.error(
                `[UltraMsg] ⚠️ UltraMsg responded with error for ${formattedTo}:`,
                raw
              );
              resolve({
                success: false,
                error: parsed.error || parsed.message || raw,
                data: parsed,
              });
            }
          } catch {
            console.log(`[UltraMsg] Raw response: ${raw}`);
            resolve({ success: res.statusCode === 200, data: raw });
          }
        });
      });

      req.on("error", (err) => {
        console.error(`[UltraMsg] ❌ Request network error to ${formattedTo}:`, err.message);
        resolve({ success: false, error: err.message });
      });

      req.on("timeout", () => {
        req.destroy();
        console.error(`[UltraMsg] ⏱️ Request timeout for ${formattedTo}`);
        resolve({ success: false, error: "Request timeout" });
      });

      req.write(postData);
      req.end();
    });
  }

  /**
   * Process a newly submitted lead:
   * 1. Deduplicates calls within 30 seconds (prevents double admin alerts or double student messages)
   * 2. Sends personalized welcome message to the student
   * 3. Sends instant alert to the institute admin
   */
  static async processLeadNotification(lead: Lead): Promise<void> {
    if (!config.ultraMsg.enabled) {
      console.log("[UltraMsg] Instant messaging is disabled in config.");
      return;
    }

    if (!lead.phone) {
      console.warn("[UltraMsg] Lead phone number missing, skipping WhatsApp notification.");
      return;
    }

    const cleanLeadPhone = formatWhatsAppNumber(lead.phone);
    const dedupKey = `${cleanLeadPhone}_${(lead.courseInterest || "").toLowerCase().trim()}`;
    const now = Date.now();
    const lastProcessed = this.recentLeadsMap.get(dedupKey);

    // 5-second deduplication window for identical submissions
    if (lastProcessed && now - lastProcessed < 5000) {
      console.log(
        `[UltraMsg] Duplicate submission suppressed for ${cleanLeadPhone} (within 5s window).`
      );
      return;
    }
    this.recentLeadsMap.set(dedupKey, now);

    // 1 & 2. Send Welcome message to the Lead (Student) and Alert message to Admin in parallel
    await Promise.allSettled([
      this.sendLeadWelcomeMessage(lead),
      this.sendAdminLeadAlert(lead),
    ]);
  }

  /**
   * Sends a personalized welcome WhatsApp message to the student
   */
  static async sendLeadWelcomeMessage(lead: Lead): Promise<void> {
    const studentName = lead.fullName || "Student";
    const courseName = lead.courseInterest || "Foreign Language Course";
    const slot = lead.preferredSlot || "Flexible Batch";

    const message = `Namaste *${studentName}*!

Thank you for your inquiry for *${courseName}* at *ILI Coaching Institute*, Indore. We have successfully received your request!

Indore Campus: Apollo Tower, MG Road, New Palasia, Indore
Course: ${courseName}
Batch Preference: ${slot}
Learning Modes: Classroom Batches & Online Live Sessions

Our academic counselor will contact you shortly with the syllabus, batch schedule, and fee details.

For immediate support, feel free to reply to this message.

Warm regards,
ILI Coaching Institute, Indore`;

    try {
      console.log(`[UltraMsg] Sending student welcome message to ${lead.phone}...`);
      await this.sendMessage(lead.phone, message);
    } catch (err: any) {
      console.error("[UltraMsg] Error in sendLeadWelcomeMessage:", err?.message || err);
    }
  }

  /**
   * Instantly sends an alert WhatsApp message to the institute admin
   */
  static async sendAdminLeadAlert(lead: Lead): Promise<void> {
    const adminPhone = config.ultraMsg.adminPhone;
    if (!adminPhone) {
      console.log("[UltraMsg] No admin phone configured for lead alerts.");
      return;
    }

    const timeString = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const leadName = lead.fullName || "New Lead";
    const leadPhone = lead.phone || "N/A";
    const leadEmail = lead.email || "N/A";
    const course = lead.courseInterest || "Not specified";
    const slot = lead.preferredSlot || "Flexible";
    const source = lead.source || "Website Form";
    const notes = lead.message || "None";

    const alertMsg = `🚨 *NEW LEAD RECEIVED!* 🚨

👤 *Student:* ${leadName}
📞 *Phone:* ${leadPhone}
📧 *Email:* ${leadEmail}
🎓 *Course Interest:* ${course}
🕒 *Batch Preference:* ${slot}
📍 *Source:* ${source}
💬 *Notes/Inquiry:* ${notes}
⏰ *Time:* ${timeString}

👉 *Action:* Please contact the student immediately for demo counseling and batch confirmation!`;

    try {
      console.log(`[UltraMsg] 📢 Sending admin lead alert to ${adminPhone}...`);
      await this.sendMessage(adminPhone, alertMsg);
    } catch (err: any) {
      console.error("[UltraMsg] Error in sendAdminLeadAlert:", err?.message || err);
    }
  }
}
