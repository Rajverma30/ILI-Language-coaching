"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, RotateCcw, Building2, MapPin, Bell, Video, KeyRound, Sparkles, AlertCircle, Loader2, MessageSquare } from "lucide-react";

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetDemoData } = useDemo();

  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [isTestingBunny, setIsTestingBunny] = useState(false);
  const [bunnyTestResult, setBunnyTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [isTestingUltraMsg, setIsTestingUltraMsg] = useState(false);
  const [ultraMsgTestResult, setUltraMsgTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleTestBunny = async () => {
    setIsTestingBunny(true);
    setBunnyTestResult(null);
    try {
      const res = await fetch("/api/bunny/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libraryId: form.bunnyLibraryId,
          apiKey: form.bunnyApiKey,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBunnyTestResult({
          success: true,
          message: data.message || "Connected to Bunny Stream successfully!",
        });
      } else {
        setBunnyTestResult({
          success: false,
          message: data.error || "Connection failed. Please verify Library ID and API Key.",
        });
      }
    } catch (err: any) {
      setBunnyTestResult({
        success: false,
        message: err.message || "Network error while connecting to Bunny Stream.",
      });
    } finally {
      setIsTestingBunny(false);
    }
  };

  const handleTestUltraMsg = async () => {
    setIsTestingUltraMsg(true);
    setUltraMsgTestResult(null);
    try {
      const res = await fetch("/api/ultramsg/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instanceId: form.ultramsgInstanceId || "",
          token: form.ultramsgToken || "",
          phone: form.adminWhatsappPhone || "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUltraMsgTestResult({
          success: true,
          message: data.message || "Test WhatsApp message sent successfully via UltraMsg!",
        });
      } else {
        setUltraMsgTestResult({
          success: false,
          message: data.error || "Failed to send WhatsApp test message. Please verify credentials.",
        });
      }
    } catch (err: any) {
      setUltraMsgTestResult({
        success: false,
        message: err.message || "Network error while connecting to UltraMsg.",
      });
    } finally {
      setIsTestingUltraMsg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Admin Console", href: "/admin" },
            { label: "Institute Settings" },
          ]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Institute Configuration & Location
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Configure institute details, Apollo Tower address, contact channels, and website announcement banner.
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm("Reset institute settings and mock data back to initial seed?")) {
                resetDemoData();
                setForm({ ...settings });
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer self-start shadow-2xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Defaults</span>
          </button>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Institute settings successfully saved to local session storage!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
        {/* Section 1: Names & Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Building2 className="w-4 h-4 text-sky-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Institutional Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Public Institute Name"
              value={form.instituteName}
              onChange={(e) => setForm({ ...form, instituteName: e.target.value })}
            />

            <Input
              label="Legal Entity Name"
              value={form.legalName}
              onChange={(e) => setForm({ ...form, legalName: e.target.value })}
            />
          </div>

          <Input
            label="Tagline / Motto"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Registration Number (CIN / Demo)"
              value={form.registrationNumber}
              onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
            />
            <Input
              label="GSTIN Placeholder"
              value={form.gstinPlaceholder}
              onChange={(e) => setForm({ ...form, gstinPlaceholder: e.target.value })}
            />
          </div>
        </div>

        {/* Section 2: Physical Campus Address in Indore */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-sky-300" />
            <h2 className="text-lg font-bold text-slate-900">
              Apollo Tower Campus Address (Indore)
            </h2>
          </div>

          <Input
            label="Street Address / Building"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Landmark"
              value={form.landmark}
              onChange={(e) => setForm({ ...form, landmark: e.target.value })}
            />
            <Input
              label="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="State & PIN"
              value={`${form.state} - ${form.postalCode}`}
              disabled
            />
          </div>
        </div>

        {/* Section 3: Communication Lines */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <h2 className="text-lg font-bold text-slate-900">
              Contact & Counseling Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Alternate Phone"
              value={form.altPhone}
              onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Admissions Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              label="WhatsApp Support Number"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
          </div>

          <Input
            label="Campus Counseling & Operating Hours"
            value={form.officeHours}
            onChange={(e) => setForm({ ...form, officeHours: e.target.value })}
          />
        </div>

        {/* Section 4: Announcement Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Bell className="w-4 h-4 text-sky-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Homepage Announcement Banner
            </h2>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.bannerVisible}
              onChange={(e) => setForm({ ...form, bannerVisible: e.target.checked })}
              className="rounded text-sky-600 focus:ring-sky-500"
            />
            <span className="text-xs font-semibold text-slate-900">
              Show Announcement Banner on public website
            </span>
          </label>

          <Textarea
            label="Announcement Message"
            rows={2}
            value={form.announcementText}
            onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
          />
        </div>

        {/* Section 5: Bunny Stream Video Delivery & Direct Upload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-sky-500" />
              <h2 className="text-lg font-bold text-slate-900">
                Bunny Stream Video CDN & Direct Upload
              </h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              Video Cloud
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Connect your Bunny.net Video Library. Once configured, you can upload video files (.mp4, .mov, .webm) directly from the admin course builder without ever leaving this portal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Bunny Video Library ID"
              placeholder="e.g. 245890"
              value={form.bunnyLibraryId || ""}
              onChange={(e) => setForm({ ...form, bunnyLibraryId: e.target.value })}
            />

            <Input
              label="Bunny Stream API Key (Access Key)"
              type="password"
              placeholder="e.g. 8d2f5a6b-3c4d-4e5f-..."
              value={form.bunnyApiKey || ""}
              onChange={(e) => setForm({ ...form, bunnyApiKey: e.target.value })}
            />
          </div>

          <Input
            label="Bunny Pull Zone Hostname (Optional)"
            placeholder="e.g. vz-xxxx.b-cdn.net"
            value={form.bunnyPullZone || ""}
            onChange={(e) => setForm({ ...form, bunnyPullZone: e.target.value })}
          />

          {/* Test Connection Button & Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800">Test Bunny.net Connectivity</p>
              <p className="text-[11px] text-slate-500">
                Verifies if your Library ID and Stream API Key can connect to Bunny CDN.
              </p>
            </div>

            <button
              type="button"
              disabled={isTestingBunny || !form.bunnyLibraryId || !form.bunnyApiKey}
              onClick={handleTestBunny}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-300 hover:border-sky-500 hover:text-sky-600 rounded-lg text-xs font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs shrink-0"
            >
              {isTestingBunny ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-sky-500 animate-spin" />
                  <span>Testing Connection...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5 text-sky-500" />
                  <span>Test Connection</span>
                </>
              )}
            </button>
          </div>

          {bunnyTestResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                bunnyTestResult.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {bunnyTestResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{bunnyTestResult.message}</span>
            </div>
          )}
        </div>

        {/* Section 6: UltraMsg WhatsApp Instant Lead Automation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <h2 className="text-lg font-bold text-slate-900">
                UltraMsg WhatsApp Instant Automation
              </h2>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ⚡ Instant 1-Sec Trigger
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Whenever a student submits an inquiry or demo booking, UltraMsg instantly sends an automated welcome message to the student and alerts the admin team via WhatsApp within ~1 second.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="UltraMsg Instance ID"
              placeholder="e.g. instance123456"
              value={form.ultramsgInstanceId || ""}
              onChange={(e) => setForm({ ...form, ultramsgInstanceId: e.target.value })}
            />

            <Input
              label="UltraMsg Token"
              type="password"
              placeholder="e.g. your_token_here"
              value={form.ultramsgToken || ""}
              onChange={(e) => setForm({ ...form, ultramsgToken: e.target.value })}
            />
          </div>

          <Input
            label="Admin WhatsApp Alert Number (+91...)"
            placeholder="e.g. +91 9826012345"
            value={form.adminWhatsappPhone || ""}
            onChange={(e) => setForm({ ...form, adminWhatsappPhone: e.target.value })}
          />

          {/* Test WhatsApp Button & Result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-emerald-50/50 border border-emerald-200/80 rounded-xl">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-800">Test UltraMsg WhatsApp Connection</p>
              <p className="text-[11px] text-slate-500">
                Sends a live test WhatsApp ping to the admin number to confirm instance and token are working.
              </p>
            </div>

            <button
              type="button"
              disabled={isTestingUltraMsg}
              onClick={handleTestUltraMsg}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white border border-emerald-300 hover:border-emerald-500 hover:text-emerald-700 rounded-lg text-xs font-bold text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs shrink-0"
            >
              {isTestingUltraMsg ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                  <span>Sending Ping...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Send Test Message</span>
                </>
              )}
            </button>
          </div>

          {ultraMsgTestResult && (
            <div
              className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                ultraMsgTestResult.success
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {ultraMsgTestResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              <span>{ultraMsgTestResult.message}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" variant="primary" size="md" className="bg-sky-600 hover:bg-sky-700 text-white">
            Save Institute Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
