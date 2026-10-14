"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Order } from "@/types";
import {
  X,
  Printer,
  Info,
} from "lucide-react";

export default function StudentOrdersPage() {
  const { orders, currentUser, settings } = useDemo();

  // Filter orders for the current demo student
  const studentOrders = orders.filter(
    (o) => o.studentEmail.toLowerCase() === (currentUser?.email || "").toLowerCase()
  );

  const [selectedReceipt, setSelectedReceipt] = useState<Order | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Student Portal", href: "/student" },
            { label: "Purchase History & Receipts" },
          ]}
        />
        <h1 className="font-editorial text-3xl font-extrabold text-[#0F1D38]">
          Purchase History & Receipts
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6479]">
          View your course enrollments and simulated Razorpay payment invoices for tuition and exam coaching fees.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-editorial text-lg font-bold text-[#0F1D38]">
            Invoices & Receipts ({studentOrders.length})
          </h2>
          <span className="text-xs text-stone-500">
            Currency: INR (₹)
          </span>
        </div>

        {studentOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No receipts found for this account.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-stone-600 font-semibold uppercase tracking-wider text-[10px] border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Course Program</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {studentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#0F1D38]">
                      {order.receiptNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-900 max-w-xs truncate">
                      {order.courseTitle}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0F1D38]">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(order)}
                        className="font-bold text-[#801D30] hover:underline cursor-pointer"
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Demo Data Advisory:</strong> These orders, transactions, and amounts are simulated for platform evaluation. No real financial charges have been executed on Razorpay.
        </p>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0F1D38] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E2D8] relative">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#0F1D38] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-stone-200 pb-4 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#0F1D38]">
                    {settings.legalName}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    {settings.address}, {settings.city}, MP - {settings.postalCode}
                  </p>
                </div>
                <Badge variant="stone" size="sm">
                  Demo Receipt
                </Badge>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Receipt No:</span>
                <strong className="font-mono">{selectedReceipt.receiptNumber}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Date:</span>
                <span>{new Date(selectedReceipt.createdAt).toLocaleDateString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Student Name:</span>
                <strong>{selectedReceipt.studentName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Course Enrolled:</span>
                <strong className="text-right max-w-xs">{selectedReceipt.courseTitle}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Transaction ID:</span>
                <span className="font-mono">{selectedReceipt.transactionId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Payment Gateway:</span>
                <span>{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-2 text-sm border-t-2 border-stone-900 font-bold">
                <span>Total Fee Paid:</span>
                <span className="text-[#801D30]">₹{selectedReceipt.amount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-1.5 rounded-lg bg-[#0F1D38] text-white text-xs font-semibold hover:bg-[#1A2E56] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
