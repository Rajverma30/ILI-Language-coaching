"use client";

import React from "react";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ShoppingBag, CreditCard, Info } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders } = useDemo();

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#0F1D38]">
            Sample Orders & Payment Records
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6479]">
            Demo transactions recorded for course enrollments and tuition fee collections.
          </p>
        </div>

        <div className="text-xs text-stone-500 bg-white px-3 py-2 rounded-lg border border-[#E8E2D8]">
          Total Demo Volume: <strong className="text-[#801D30]">₹{totalRevenue.toLocaleString("en-IN")}*</strong>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
        <div>
          <strong className="block mb-0.5">Sample Orders Notice — Razorpay Boundary Prepared:</strong>
          <p className="leading-relaxed">
            The transactions below are simulated demonstration data for reviewing platform workflows. In production, Razorpay orders, webhooks, and server-side HMAC signature verification will register real financial captures into MongoDB Atlas.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-stone-600 uppercase text-[10px] tracking-wider border-b border-stone-200">
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
            <tbody className="divide-y divide-stone-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0F1D38]">
                    {ord.receiptNumber}
                  </td>

                  <td className="py-3.5 px-4">
                    <strong className="text-[#0F1D38] block">{ord.studentName}</strong>
                    <span className="text-[11px] text-stone-400 font-mono">{ord.studentEmail}</span>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-stone-800 max-w-xs truncate">
                    {ord.courseTitle}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-sm text-[#0F1D38]">
                    ₹{ord.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="py-3.5 px-4 text-stone-600">
                    <div>{ord.paymentMethod}</div>
                    <span className="text-[10px] font-mono text-stone-400">{ord.transactionId}</span>
                  </td>

                  <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
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
