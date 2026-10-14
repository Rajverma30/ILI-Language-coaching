import React from "react";
import { demoTestimonials } from "@/data/mockData";
import { Star, Quote, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-sky-600 text-sky-600" />
            <span>Alumni Narratives</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-slate-900">
            Success Stories Across Europe & Beyond
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Demonstrative alumni feedback illustrating typical student milestones from Apollo Tower coaching to overseas universities and international careers.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 rounded-md text-[11px] text-sky-800 font-medium">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Demo Notice: Fictional sample testimonials illustrating typical course outcomes.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-sky-100 absolute top-5 right-5" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                  <Badge variant="stone" size="sm" className="ml-2 text-[9px]">
                    Demo Review
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-1">
                <h4 className="font-editorial font-bold text-sm text-slate-900">
                  {item.name}
                </h4>
                <p className="text-xs font-semibold text-sky-600">
                  {item.tag}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>{item.course}</span>
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
