"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const { settings, addLead, courses } = useDemo();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    courseInterest: courses[0]?.title || "German A1: Complete Foundation for Beginners",
    preferredSlot: "Weekday Evening (Apollo Tower)",
    preferredContactMethod: "Phone" as "Phone" | "WhatsApp" | "Email",
    message: "",
    consent: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Please provide your full name";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      errs.phone = "Please enter a valid 10-digit phone number";
    if (!form.email.trim() || !form.email.includes("@"))
      errs.email = "Please provide a valid email address";
    if (!form.consent) errs.consent = "Please agree to be contacted for admission counseling";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addLead({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        courseInterest: form.courseInterest,
        preferredSlot: form.preferredSlot,
        preferredContactMethod: form.preferredContactMethod,
        message: form.message.trim(),
        source: "Website Form",
      });

      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <PublicLayout>
      <div className="bg-[#FAF8F5] border-b border-[#E8E2D8] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "Contact Indore Campus" }]} />

          <div className="max-w-2xl space-y-2">
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1D38]">
              Contact Our Indore Campus
            </h1>
            <p className="text-sm sm:text-base text-[#5C6479]">
              Reach our admissions counselors, schedule an in-person orientation at Apollo Tower, or enquire about upcoming batch schedules.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details & Location Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="font-editorial text-2xl font-bold text-[#0F1D38]">
                Apollo Tower Center
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-[#1E293B]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF0F2] text-[#801D30] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1D38]">Address</h4>
                    <p className="text-stone-500 mt-0.5 leading-relaxed">
                      {settings.address}, {settings.landmark}, {settings.city}, {settings.state} - {settings.postalCode}, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF0F2] text-[#801D30] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1D38]">Direct Phone Lines</h4>
                    <p className="text-stone-500 mt-0.5">
                      {settings.phone} / {settings.altPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF0F2] text-[#801D30] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1D38]">Email Inquiries</h4>
                    <p className="text-stone-500 mt-0.5">
                      {settings.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF0F2] text-[#801D30] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F1D38]">Counseling Hours</h4>
                    <p className="text-stone-500 mt-0.5 leading-relaxed">
                      {settings.officeHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#0F1D38] text-white hover:bg-[#1A2E56]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E0C17E]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/919826012345?text=${encodeURIComponent(
                    "Hello ILI Languages Indore, I would like information regarding foreign language courses."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Simulated Map Card */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D8] p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-base font-bold text-[#0F1D38]">
                  Transit & Landmark Directions
                </h3>
                <Navigation className="w-4 h-4 text-[#801D30]" />
              </div>
              <p className="text-xs text-[#5C6479] leading-relaxed">
                Apollo Tower is directly across from the 56 Dukan entrance on MG Road. For students travelling by iBus, alight at the Industry House or Palasia Square stop. Ample two-wheeler and four-wheeler parking is available in the complex basement.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E8E2D8] p-6 sm:p-10 shadow-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-stone-100 pb-4">
                    <h2 className="font-editorial text-2xl font-bold text-[#0F1D38]">
                      Course Enquiry & Counseling Form
                    </h2>
                    <p className="text-xs text-[#5C6479] mt-1">
                      Submit your details to receive syllabus brochures, batch fee details, and a counseling callback from our Apollo Tower team.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="e.g. Raj Verma"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      error={errors.fullName}
                    />

                    <Input
                      label="Phone Number"
                      placeholder="+91 98260 12345"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      error={errors.phone}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      error={errors.email}
                    />

                    <Select
                      label="Language of Interest"
                      value={form.courseInterest}
                      onChange={(e) => setForm({ ...form, courseInterest: e.target.value })}
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Preferred Batch Timing"
                      value={form.preferredSlot}
                      onChange={(e) => setForm({ ...form, preferredSlot: e.target.value })}
                    >
                      <option value="Weekday Morning (8:00 AM - 10:00 AM)">Weekday Morning (8:00 AM)</option>
                      <option value="Weekday Evening (6:30 PM - 8:30 PM)">Weekday Evening (6:30 PM)</option>
                      <option value="Weekend Fast-Track (Sat-Sun Morning)">Weekend Fast-Track (Sat-Sun)</option>
                      <option value="Online Live Dual Mode">Online Live Dual Mode</option>
                    </Select>

                    <Select
                      label="Preferred Contact Channel"
                      value={form.preferredContactMethod}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          preferredContactMethod: e.target.value as "Phone" | "WhatsApp" | "Email",
                        })
                      }
                    >
                      <option value="Phone">Phone Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </Select>
                  </div>

                  <Textarea
                    label="Questions or Learning Objectives (Optional)"
                    rows={3}
                    placeholder="Tell us about your background or whether you are aiming for higher studies, German visa, DELF, or corporate fluency..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                        className="mt-1 rounded text-[#801D30] focus:ring-[#801D30]"
                      />
                      <span className="text-xs text-stone-600 leading-normal">
                        I agree to receive course counseling, batch updates, and syllabus material from ILI Foreign Languages Institute, Apollo Tower, Indore.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-red-600 mt-1">{errors.consent}</p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full"
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Course Enquiry
                    </Button>
                  </div>

                  <p className="text-[11px] text-stone-400 text-center">
                    Demo Mode Notice: Submitting this form safely saves your enquiry into the local demo leads register (viewable in Admin Portal &rarr; Leads). No live spam or SMS will be dispatched.
                  </p>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#0F1D38]">
                    Enquiry Received Successfully!
                  </h3>

                  <p className="text-sm text-[#5C6479] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{form.fullName}</strong>. Your enquiry for <strong>{form.courseInterest}</strong> has been logged in the demo administration register.
                  </p>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs text-stone-600 max-w-sm mx-auto text-left space-y-1">
                    <div><strong>Contact:</strong> {form.phone} ({form.preferredContactMethod})</div>
                    <div><strong>Slot:</strong> {form.preferredSlot}</div>
                    <div className="text-emerald-700 font-semibold pt-1">
                      Status: Registered in Admin Leads Database
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          fullName: "",
                          phone: "",
                          email: "",
                          courseInterest: courses[0]?.title || "German A1",
                          preferredSlot: "Weekday Evening (Apollo Tower)",
                          preferredContactMethod: "Phone",
                          message: "",
                          consent: true,
                        });
                      }}
                    >
                      Submit Another Enquiry
                    </Button>
                    <a
                      href="/admin/leads"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#0F1D38] text-white hover:bg-[#1A2E56]"
                    >
                      <span>View in Admin Leads &rarr;</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
