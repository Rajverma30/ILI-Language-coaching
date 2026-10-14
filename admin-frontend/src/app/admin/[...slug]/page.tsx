"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminCatchAllRedirect() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const slug = params?.slug;
    if (Array.isArray(slug)) {
      router.replace(`/${slug.join("/")}`);
    } else if (typeof slug === "string") {
      router.replace(`/${slug}`);
    } else {
      router.replace("/dashboard");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500">Redirecting to admin panel...</p>
      </div>
    </div>
  );
}
