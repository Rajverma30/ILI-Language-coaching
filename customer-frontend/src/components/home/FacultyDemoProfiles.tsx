import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Award, GraduationCap, Info } from "lucide-react";

export const FacultyDemoProfiles: React.FC = () => {
  const faculty = [
    {
      name: "Frau Ananya Saxena",
      role: "Senior German Faculty",
      language: "German (A1–B2)",
      credentials: "C1 Certified, Goethe-Institut Trainer Alumni",
      experience: "10+ Years Mentoring Central India Aspirants",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mme. Shweta Joshi",
      role: "Lead French Educator",
      language: "French (A1–B1)",
      credentials: "Alliance Française DALF C1 Accredited",
      experience: "8+ Years in DELF & TEF Canada Preparation",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Prof. Rahul Sharma",
      role: "Spanish Language Specialist",
      language: "Spanish (A1–B1)",
      credentials: "DELE C1 Certified (Instituto Cervantes)",
      experience: "7+ Years in Hispanic Linguistics & Corporate Coaching",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Sunita Trivedi",
      role: "Business English & IELTS Mentor",
      language: "English (C1/IELTS)",
      credentials: "Cambridge CELTA Certified & Ph.D. in Linguistics",
      experience: "14+ Years in Executive Communication & IELTS 8.0+",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
            <span>Faculty Representation</span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-slate-900">
            Linguistic Mentors & Certified Educators
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            Sample instructor profiles illustrating the pedagogical expertise and certification standards deployed at ILI Foreign Languages Institute.
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 border border-sky-200 rounded-md text-[11px] text-sky-800 font-medium">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>Demo Notice: Representative sample instructor profiles for UI demonstration pending institute faculty roster confirmation.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member) => (
            <div
              key={member.name}
              className="bg-slate-50 rounded-xl border border-slate-200 hover:border-sky-200 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="stone" size="sm">
                    Demo Profile
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {member.language}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <Award className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span>{member.credentials}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-5">
                    {member.experience}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
