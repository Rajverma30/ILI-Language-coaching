"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Settings, CheckCircle2, RotateCcw, Building2, MapPin, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetDemoData } = useDemo();

  const [form, setForm] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Admin Console", href: "/admin" },
            { label: "Institute Settings" },
          ]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
              Institute Configuration & Location
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6479]">
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50 cursor-pointer self-start"
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

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-10 shadow-xs space-y-8">
        {/* Section 1: Names & Identity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <Building2 className="w-4 h-4 text-[#801D30]" />
            <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
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
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <MapPin className="w-4 h-4 text-[#801D30]" />
            <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
              Apollo Tower Campus Address (Indore)
            </h2>
          </div>

          <Input
            label="Street Address / Building"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />

            <Input
              label="Country"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
            />

            <Input
              label="Postal Code (PIN)"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            />
          </div>
        </div>

        {/* Section 3: Contact Channels */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
              Contact Channels & Hours
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <Input
              label="Alternate Landline"
              value={form.altPhone}
              onChange={(e) => setForm({ ...form, altPhone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Admissions Email"
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
          <div className="flex items-center gap-2 border-b border-stone-100 pb-2">
            <Bell className="w-4 h-4 text-[#801D30]" />
            <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
              Homepage Announcement Banner
            </h2>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.bannerVisible}
              onChange={(e) => setForm({ ...form, bannerVisible: e.target.checked })}
              className="rounded text-[#801D30]"
            />
            <span className="text-xs font-semibold text-[#0F1D38]">
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

        <div className="pt-4 border-t border-stone-200 flex justify-end">
          <Button type="submit" variant="secondary" size="md">
            Save Institute Configuration
          </Button>
        </div>
      </form>
    </div>
  );
}
