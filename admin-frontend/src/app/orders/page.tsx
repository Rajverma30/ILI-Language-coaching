"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { Info } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders } = useDemo();

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Sample Orders & Payment Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Demo transactions recorded for course enrollments and tuition fee collections.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
          Total Demo Volume: <strong className="text-sky-700">₹{totalRevenue.toLocaleString("en-IN")}*</strong>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-sky-950 flex items-start gap-3">
        <Info className="w-4 h-4 shrink-0 text-sky-700 mt-0.5" />
        <div>
          <strong className="block mb-0.5">Sample Orders Notice — Razorpay Boundary Prepared:</strong>
          <p className="leading-relaxed text-sky-900">
            The transactions below are simulated demonstration data for reviewing platform workflows. In production, Razorpay orders, webhooks, and server-side HMAC signature verification will register real financial captures into MongoDB Atlas.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Receipt #</th>
                <th className="py-3 px-4">Candidate / Student</th>
                <th className="py-3 px-4">Language Program</th>
                <th className="py-3 px-4">Fee Amount</th>
                <th className="py-3 px-4">Gateway & Txn</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-sky-50/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {ord.receiptNumber}
                  </td>

                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block">{ord.studentName}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">{ord.studentEmail}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs truncate">
                    {ord.courseTitle}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-sm text-slate-900">
                    ₹{ord.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{ord.paymentMethod}</div>
                    <span className="text-[10px] font-mono text-slate-400">{ord.transactionId}</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                    {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ord.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : ord.status === "Pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
