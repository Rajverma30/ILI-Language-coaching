"use client";

import React, { useState } from "react";
import Link from "next/link";
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
      <div className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={[{ label: "Contact Indore Campus" }]} />

          <div className="max-w-2xl space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
              Contact Our Indore Campus
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Reach our admissions counselors, schedule an in-person orientation at Apollo Tower, or enquire about upcoming batch schedules.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Details & Location Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900">
                Apollo Tower Center
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Address</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">
                      {settings.address}, {settings.landmark}, {settings.city}, {settings.state} - {settings.postalCode}, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Phone Lines</h4>
                    <p className="text-slate-500 mt-0.5">
                      {settings.phone} / {settings.altPhone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Email Inquiries</h4>
                    <p className="text-slate-500 mt-0.5">
                      {settings.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5 border border-sky-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Counseling Hours</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">
                      {settings.officeHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/919826012345?text=${encodeURIComponent(
                    "Hello ILI Languages Indore, I would like information regarding foreign language courses."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  Transit & Landmark Directions
                </h3>
                <Navigation className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apollo Tower is directly across from the 56 Dukan entrance on MG Road. For students travelling by iBus, alight at the Industry House or Palasia Square stop. Ample two-wheeler and four-wheeler parking is available in the complex basement.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Course Enquiry & Counseling Form
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
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
                        className="mt-1 rounded text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
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
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Course Enquiry
                    </Button>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center">
                    Notice: Submitting this form registers your enquiry with our counseling team. We will respond promptly.
                  </p>
                </form>
              ) : (
                <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    Enquiry Received Successfully!
                  </h3>

                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{form.fullName}</strong>. Your enquiry for <strong>{form.courseInterest}</strong> has been logged.
                  </p>

                  <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-slate-700 max-w-sm mx-auto text-left space-y-1">
                    <div><strong>Contact:</strong> {form.phone} ({form.preferredContactMethod})</div>
                    <div><strong>Slot:</strong> {form.preferredSlot}</div>
                    <div className="text-emerald-700 font-semibold pt-1">
                      Status: Admissions counselor will reach out shortly
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
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 shadow-xs transition-colors"
                    >
                      <span>Explore Courses &rarr;</span>
                    </Link>
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
