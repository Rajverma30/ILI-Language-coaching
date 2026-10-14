import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";
import AdminLayout from "@/components/layout/AdminLayout";
import { Suspense } from "react";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Administrative Console | ILI Foreign Languages Institute Indore",
  description: "Management Console for ILI Foreign Languages Institute, Apollo Tower, Indore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        <AdminProvider>
          <Suspense fallback={null}>
            <AdminLayout>{children}</AdminLayout>
          </Suspense>
        </AdminProvider>
      </body>
    </html>
  );
}
