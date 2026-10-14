"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { LeadStatus } from "@/types";
import {
  Users,
  BookOpen,
  MessageSquareCheck,
  ShoppingBag,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { courses, students, leads, orders, updateLeadStatus } = useDemo();

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
  const pendingLeads = leads.filter((l) => l.status === "New" || l.status === "Demo Scheduled").length;

  const recentLeads = leads.slice(0, 5);
  const recentOrders = orders.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title & Quick Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
            Administration Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6479]">
            Live operational metrics for ILI Foreign Languages Institute, Apollo Tower, Indore.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#801D30] text-white hover:bg-[#9B283E] shadow-2xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Course</span>
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-white text-[#0F1D38] border border-[#E8E2D8] hover:bg-stone-50 transition-colors"
          >
            <span>Review Leads ({leads.length})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Enrolled Students</span>
            <Users className="w-4 h-4 text-[#0F1D38]" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {students.length}
          </div>
          <p className="text-[10px] text-stone-400">Indore batch learners</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Programs</span>
            <BookOpen className="w-4 h-4 text-[#801D30]" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {courses.length}
          </div>
          <p className="text-[10px] text-stone-400">German, French, Spanish, etc.</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Enquiries</span>
            <MessageSquareCheck className="w-4 h-4 text-[#C5A059]" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {leads.length}
          </div>
          <p className="text-[10px] text-amber-700 font-semibold">{pendingLeads} pending follow-up</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sample Orders</span>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-editorial text-[#0F1D38]">
            {orders.length}
          </div>
          <p className="text-[10px] text-stone-400">Demo checkout entries</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E8E2D8] shadow-2xs space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Sample Revenue</span>
            <TrendingUp className="w-4 h-4 text-[#801D30]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-editorial text-[#801D30]">
            ₹{totalRevenue.toLocaleString("en-IN")}*
          </div>
          <p className="text-[10px] text-stone-400">* Simulated demo totals</p>
        </div>
      </div>

      {/* Grid: Recent Leads & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries & Leads */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E8E2D8] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
                Recent Inquiries & Leads
              </h2>
              <p className="text-xs text-stone-500">Apollo Tower walk-ins & online demo bookings</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#801D30] hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-stone-600 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Lead Name</th>
                  <th className="py-2.5 px-3">Interested Course</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#FAF8F5]/60">
                    <td className="py-3 px-3 font-semibold text-[#0F1D38]">
                      {lead.fullName}
                      <span className="block text-[10px] font-normal text-stone-400">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-700 max-w-[150px] truncate">
                      {lead.courseInterest}
                    </td>
                    <td className="py-3 px-3 font-mono text-stone-600">
                      {lead.phone}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="text-[11px] font-semibold rounded px-2 py-1 border border-stone-300 bg-white"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Demo Scheduled">Demo Scheduled</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Sample Orders */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8E2D8] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
                Sample Course Orders
              </h2>
              <p className="text-xs text-stone-500">Razorpay demo simulation</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-[#801D30] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-3.5 rounded-xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-[#0F1D38] truncate max-w-[180px]">
                    {order.courseTitle}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {order.studentName} &bull; <span className="font-mono">{order.receiptNumber}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-sm text-[#0F1D38] block">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-xl bg-white border border-[#E8E2D8] text-xs text-stone-500 flex items-start gap-3">
        <Info className="w-4 h-4 shrink-0 text-[#801D30] mt-0.5" />
        <p className="leading-relaxed">
          <strong>Local Persistence Active:</strong> All changes made in this administrative panel (courses added, curriculum modified, lead statuses adjusted, and institute settings updated) are safely synchronized to your local browser storage for live demonstration.
        </p>
      </div>
    </div>
  );
}
