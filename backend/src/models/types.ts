export type Role = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export type CourseLanguage = "German" | "French" | "Spanish" | "English" | "Japanese";

export type CourseLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Beginner" | "Intermediate" | "Advanced" | "IELTS" | "JLPT N5";

export interface LectureQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lecture {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  videoUrl?: string;
  bunnyVideoId?: string; // Bunny Stream official video ID
  order: number;
  notes?: string;
  summary?: string;
  quiz?: LectureQuiz;
  isFreePreview?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  lectures: Lecture[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  language: CourseLanguage;
  level: CourseLevel;
  shortDescription: string;
  fullDescription: string;
  durationHours: number;
  totalLectures: number;
  samplePrice: number;
  originalPrice?: number;
  coverImage: string;
  instructorName: string;
  instructorTitle: string;
  instructorBio: string;
  highlights: string[];
  prerequisites: string;
  certificateInfo: string;
  sections: CourseSection[];
  featured?: boolean;
  status: "Active" | "Draft" | "Archived";
  enrolledStudentsCount: number;
}

export interface LectureProgress {
  completedLectureIds: string[];
  lastLectureId?: string;
  lastAccessedAt?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolledCourseIds: string[];
  progress: Record<string, LectureProgress>;
  joinedDate: string;
  status: "Active" | "Paused" | "Graduated";
}

export type LeadStatus = "New" | "Contacted" | "Demo Scheduled" | "Converted" | "Closed";

export type LeadSource =
  | "Website Form"
  | "Demo Booking"
  | "Walk-in Indore"
  | "Phone Enquiry"
  | "Referral"
  | "Instagram Ads"
  | "WhatsApp Ads"
  | "YouTube Ads"
  | "Telegram"
  | string;

export interface LeadNote {
  id: string;
  text: string;
  date: string;
  author: string;
}

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  courseInterest: string;
  preferredSlot: string;
  preferredContactMethod: "Phone" | "WhatsApp" | "Email";
  message?: string;
  source: LeadSource;
  status: LeadStatus;
  notes: LeadNote[];
  createdAt: string;
}

export type PaymentStatus = "Paid" | "Pending" | "Refunded";

export interface Order {
  id: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  receiptNumber: string;
}

export interface InstituteSettings {
  instituteName: string;
  legalName: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  altPhone: string;
  email: string;
  admissionsEmail: string;
  whatsapp: string;
  officeHours: string;
  bannerVisible: boolean;
  announcementText: string;
  registrationNumber: string;
  gstinPlaceholder: string;
  bunnyLibraryId?: string;
  bunnyApiKey?: string;
  bunnyPullZone?: string;
  ultramsgInstanceId?: string;
  ultramsgToken?: string;
  adminWhatsappPhone?: string;
}
