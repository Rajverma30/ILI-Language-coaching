import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";
import { Suspense } from "react";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ILI Foreign Languages Institute | Apollo Tower, Indore",
  description:
    "Indore's Premier International Language School at Apollo Tower, MG Road. German, French, Spanish, English, and Japanese courses with CEFR-aligned training, Goethe/DELF exam prep, and interactive recorded learning.",
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
        <DemoProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </DemoProvider>
      </body>
    </html>
  );
}
