import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/DemoContext";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ILI Foreign Languages Institute | Apollo Tower, Indore",
  description:
    "Indore's Premier International Language School at Apollo Tower, MG Road. German, French, Spanish, English, and Japanese courses with CEFR-aligned training, Goethe/DELF exam prep, and interactive recorded learning.",
};

import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#0F1D38]">
        <DemoProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </DemoProvider>
      </body>
    </html>
  );
}

