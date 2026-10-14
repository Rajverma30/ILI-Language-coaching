import React from "react";
import { Mic, Users, Award, Laptop, Sparkles, CheckCircle2 } from "lucide-react";

export const LearningApproach: React.FC = () => {
  const pillars = [
    {
      icon: <Mic className="w-6 h-6 text-sky-600" />,
      title: "1. Native Phonetic Immersion",
      subtitle: "Eliminating hesitation from Day 1",
      description:
        "We build natural pronunciation from the first session, focusing on mouth positioning, vowel nuance, and eliminating Mother Tongue Influence (MTI) before bad habits take root.",
      points: ["Phonetic ear-training audio drills", "Daily spoken roleplays", "IPA-guided intonation"],
    },
    {
      icon: <Users className="w-6 h-6 text-sky-600" />,
      title: "2. Small Cohort Dynamic (Max 12-15)",
      subtitle: "Personalized faculty attention in Indore",
      description:
        "Unlike mass lecture halls, every learner in our Apollo Tower batches receives 20+ minutes of spoken airtime every single class to practice real conversation with peers.",
      points: ["Simulated cafe and travel scenarios", "Peer debate rounds", "Individual trainer feedback"],
    },
    {
      icon: <Award className="w-6 h-6 text-sky-600" />,
      title: "3. Official Exam Simulation",
      subtitle: "Targeted Goethe, DELF, DELE, IELTS mastery",
      description:
        "Every syllabus aligns strictly with the Common European Framework of Reference (CEFR). We conduct rigorous timed mock tests mirroring the exact international testing center pattern.",
      points: ["Listening (Hören) audio lab runs", "Writing (Schreiben) feedback", "Speaking (Sprechen) mock interviews"],
    },
    {
      icon: <Laptop className="w-6 h-6 text-sky-600" />,
      title: "4. Recorded LMS & Revision Portal",
      subtitle: "Never miss a concept with on-demand video",
      description:
        "All enrolled learners receive access to this online learning portal. Replay recorded grammar breakdowns, review vocabulary summaries, and test retention with interactive quizzes anytime.",
      points: ["Structured section navigation", "Digital lecture notes & cheat sheets", "Progress tracking dashboard"],
    },
  ];

  return (
    <section id="approach" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>The ILI Methodology</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-extrabold text-slate-900">
            The 4-Pillar Language Immersion Model
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Acquiring a foreign language is not about rote memorization of grammar charts — it is about vocal fluency, cognitive confidence, and structured feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 uppercase tracking-wider mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                {pillar.points.map((pt) => (
                  <div key={pt} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
