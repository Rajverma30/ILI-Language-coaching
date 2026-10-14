import React from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { CourseHighlights } from "@/components/home/CourseHighlights";
import { LearningApproach } from "@/components/home/LearningApproach";
import { IndoreCampus } from "@/components/home/IndoreCampus";
import { FacultyDemoProfiles } from "@/components/home/FacultyDemoProfiles";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { AdmissionsCta } from "@/components/home/AdmissionsCta";

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <CourseHighlights />
      <LearningApproach />
      <IndoreCampus />
      <FacultyDemoProfiles />
      <TestimonialsSection />
      <FaqSection />
      <AdmissionsCta />
    </PublicLayout>
  );
}
