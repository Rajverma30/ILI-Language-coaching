"use client";

import React, { useState, useMemo } from "react";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Lead, LeadStatus, LeadSource } from "@/types";
import {
  MessageSquareCheck,
  Search,
  PlusCircle,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  X,
  Send,
  Clock,
  Sparkles,
} from "lucide-react";

export default function AdminLeadsManagementPage() {
  const { leads, updateLeadStatus, addLeadNote, addLead, courses } = useDemo();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Selected lead for note drawer
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Modal for new walk-in / manual lead
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [manualForm, setManualForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    courseInterest: courses[0]?.title || "German A1: Complete Foundation for Beginners",
    preferredSlot: "Weekend Morning (Apollo Tower)",
    preferredContactMethod: "Phone" as "Phone" | "WhatsApp" | "Email",
    source: "Walk-in Indore" as LeadSource,
    message: "",
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        l.fullName.toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        l.courseInterest.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "All" || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [leads, search, statusFilter]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;

    addLeadNote(selectedLead.id, newNoteText.trim(), "Admin Desk");
    setNewNoteText("");

    // Update local selectedLead state
    const refreshed = leads.find((l) => l.id === selectedLead.id);
    if (refreshed) {
      setSelectedLead({
        ...refreshed,
        notes: [
          {
            id: `note-${Date.now()}`,
            text: newNoteText.trim(),
            date: "Just now",
            author: "Admin Desk",
          },
          ...refreshed.notes,
        ],
      });
    }
  };

  const handleManualLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.fullName.trim() || !manualForm.phone.trim()) return;

    addLead({
      fullName: manualForm.fullName.trim(),
      phone: manualForm.phone.trim(),
      email: manualForm.email.trim() || "walkin.indore@example.com",
      courseInterest: manualForm.courseInterest,
      preferredSlot: manualForm.preferredSlot,
      preferredContactMethod: manualForm.preferredContactMethod,
      source: manualForm.source,
      message: manualForm.message.trim(),
    });

    setAddLeadModalOpen(false);
    setManualForm({
      fullName: "",
      phone: "",
      email: "",
      courseInterest: courses[0]?.title || "German A1",
      preferredSlot: "Weekend Morning (Apollo Tower)",
      preferredContactMethod: "Phone",
      source: "Walk-in Indore",
      message: "",
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
            Enquiry & Lead Management
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6479]">
            Track admissions inquiries, demo bookings, and Apollo Tower walk-in prospects.
          </p>
        </div>

        <button
          onClick={() => setAddLeadModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#801D30] text-white hover:bg-[#9B283E] shadow-2xs self-start cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Walk-In / Phone Lead</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#E8E2D8] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone, course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#E8E2D8] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(["All", "New", "Contacted", "Demo Scheduled", "Converted", "Closed"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                  statusFilter === status
                    ? "bg-[#0F1D38] text-white font-bold"
                    : "bg-[#FAF8F5] text-stone-600 border border-stone-200 hover:bg-stone-200"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Interested Program</th>
                <th className="py-3 px-4">Slot & Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Notes & History</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0F1D38]">
                    {lead.fullName}
                    <span className="block text-[11px] font-normal text-stone-500">
                      Method: {lead.preferredContactMethod}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-stone-700">
                    <div>{lead.phone}</div>
                    <div className="text-[11px] text-stone-400 font-sans">{lead.email}</div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs truncate text-stone-800 font-medium">
                    {lead.courseInterest}
                  </td>

                  <td className="py-3.5 px-4 text-stone-600">
                    <div>{lead.preferredSlot}</div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                      {lead.source}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                      className={`text-xs font-bold rounded-md px-2 py-1 border transition-colors ${
                        lead.status === "New"
                          ? "bg-amber-50 text-amber-900 border-amber-300"
                          : lead.status === "Demo Scheduled"
                          ? "bg-blue-50 text-blue-900 border-blue-300"
                          : lead.status === "Converted"
                          ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                          : "bg-white text-stone-700 border-stone-300"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Demo Scheduled">Demo Scheduled</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="font-bold text-[#801D30] hover:underline cursor-pointer"
                    >
                      {lead.notes.length > 0 ? `${lead.notes.length} Notes` : "+ Add Note"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes & Follow-Up Drawer Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0F1D38] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E8E2D8] relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-stone-200 pb-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#801D30]">
                Lead Details & Follow-Ups
              </span>
              <h3 className="font-editorial text-xl font-bold text-[#0F1D38]">
                {selectedLead.fullName}
              </h3>
              <p className="text-xs text-stone-500">
                {selectedLead.phone} &bull; {selectedLead.email}
              </p>
            </div>

            {selectedLead.message && (
              <div className="p-3 rounded-lg bg-[#FAF8F5] border border-stone-200 text-xs mb-4">
                <strong className="block text-stone-600 mb-0.5">Original Inquiry Message:</strong>
                <p className="text-stone-800 italic">{selectedLead.message}</p>
              </div>
            )}

            {/* Existing Notes List */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Follow-Up History
              </h4>
              {selectedLead.notes.length === 0 ? (
                <p className="text-xs text-stone-400 italic">No notes logged yet.</p>
              ) : (
                selectedLead.notes.map((n) => (
                  <div key={n.id} className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <p className="text-stone-800 leading-relaxed">{n.text}</p>
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>{n.author}</span>
                      <span>{n.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add New Note */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-3 border-t border-stone-200">
              <Textarea
                placeholder="Log call outcome, demo slot confirmation, or counselor comments..."
                rows={2}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-stone-400">Saved to demo local session</span>
                <Button type="submit" variant="secondary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Save Note
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Lead */}
      {addLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0F1D38] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E8E2D8] relative">
            <button
              onClick={() => setAddLeadModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-editorial text-lg font-bold text-[#0F1D38] mb-4">
              Add Walk-In / Phone Lead
            </h3>

            <form onSubmit={handleManualLeadSubmit} className="space-y-3.5">
              <Input
                label="Full Name"
                required
                value={manualForm.fullName}
                onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
              />

              <Input
                label="Phone Number"
                required
                placeholder="+91 98260 12345"
                value={manualForm.phone}
                onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
              />

              <Input
                label="Email (Optional)"
                value={manualForm.email}
                onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
              />

              <Select
                label="Target Language Course"
                value={manualForm.courseInterest}
                onChange={(e) => setManualForm({ ...manualForm, courseInterest: e.target.value })}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title}
                  </option>
                ))}
              </Select>

              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Inquiry Source"
                  value={manualForm.source}
                  onChange={(e) => setManualForm({ ...manualForm, source: e.target.value as LeadSource })}
                >
                  <option value="Walk-in Indore">Walk-in Apollo Tower</option>
                  <option value="Phone Enquiry">Phone Enquiry</option>
                  <option value="Referral">Student Referral</option>
                  <option value="Website Form">Website Form</option>
                </Select>

                <Select
                  label="Preferred Slot"
                  value={manualForm.preferredSlot}
                  onChange={(e) => setManualForm({ ...manualForm, preferredSlot: e.target.value })}
                >
                  <option value="Weekend Morning">Weekend Morning</option>
                  <option value="Weekday Evening">Weekday Evening</option>
                  <option value="Weekday Morning">Weekday Morning</option>
                </Select>
              </div>

              <Textarea
                label="Inquiry Notes / Remarks"
                rows={2}
                value={manualForm.message}
                onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
              />

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <Button type="button" variant="outline" size="sm" onClick={() => setAddLeadModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="secondary" size="sm">
                  Add Lead to System
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
