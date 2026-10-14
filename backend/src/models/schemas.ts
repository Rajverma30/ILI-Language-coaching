import mongoose, { Schema, Document } from "mongoose";
import {
  Course as CourseType,
  User as UserType,
  Student as StudentType,
  Lead as LeadType,
  Order as OrderType,
  InstituteSettings as SettingsType,
} from "./types";

// ================= COURSE SCHEMA =================
const QuizSchema = new Schema(
  {
    question: { type: String, default: "" },
    options: { type: [String], default: [] },
    correctIndex: { type: Number, default: 0 },
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const LectureSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, default: "15m" },
    durationSeconds: { type: Number, default: 900 },
    videoUrl: { type: String, default: "" },
    bunnyVideoId: { type: String, default: "" },
    order: { type: Number, default: 1 },
    notes: { type: String, default: "" },
    summary: { type: String, default: "" },
    isFreePreview: { type: Boolean, default: false },
    hasQuiz: { type: Boolean, default: false },
    quiz: { type: QuizSchema, required: false },
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    order: { type: Number, default: 1 },
    hasQuiz: { type: Boolean, default: false },
    quiz: { type: QuizSchema, required: false },
    lectures: { type: [LectureSchema], default: [] },
  },
  { _id: false }
);

const CourseMongoSchema = new Schema<CourseType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    language: {
      type: String,
      required: true,
      enum: ["German", "French", "Spanish", "English", "Japanese"],
    },
    level: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    durationHours: { type: Number, default: 60 },
    totalLectures: { type: Number, default: 0 },
    samplePrice: { type: Number, required: true },
    originalPrice: { type: Number },
    coverImage: { type: String, default: "" },
    instructorName: { type: String, default: "Faculty Expert" },
    instructorTitle: { type: String, default: "Lead Language Instructor" },
    instructorBio: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    prerequisites: { type: String, default: "None" },
    certificateInfo: { type: String, default: "ILI Certificate of Language Proficiency" },
    sections: { type: [SectionSchema], default: [] },
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Active", "Draft", "Archived"],
      default: "Active",
    },
    enrolledStudentsCount: { type: Number, default: 0 },
    visitorCount: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CourseModel =
  mongoose.models.Course || mongoose.model<CourseType>("Course", CourseMongoSchema);

// ================= USER SCHEMA =================
const UserMongoSchema = new Schema<UserType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    passwordHash: { type: String, required: true },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model<UserType>("User", UserMongoSchema);

// ================= STUDENT SCHEMA =================
const StudentMongoSchema = new Schema<StudentType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    phone: { type: String, default: "" },
    enrolledCourseIds: { type: [String], default: [] },
    progress: { type: Schema.Types.Mixed, default: {} },
    joinedDate: { type: String, default: () => new Date().toISOString() },
    status: { type: String, enum: ["Active", "Paused", "Graduated"], default: "Active" },
  },
  { timestamps: true }
);

export const StudentModel =
  mongoose.models.Student || mongoose.model<StudentType>("Student", StudentMongoSchema);

// ================= LEAD SCHEMA =================
const LeadNoteSchema = new Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String, default: "Admissions Counselor" },
  },
  { _id: false }
);

const LeadMongoSchema = new Schema<LeadType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, default: "" },
    phone: { type: String, required: true },
    courseInterest: { type: String, default: "German" },
    preferredSlot: { type: String, default: "Weekday Evening" },
    preferredContactMethod: {
      type: String,
      default: "WhatsApp",
    },
    message: { type: String, default: "" },
    source: {
      type: String,
      default: "Website Form",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Demo Scheduled", "Converted", "Closed"],
      default: "New",
    },
    notes: { type: [LeadNoteSchema], default: [] },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const LeadModel =
  mongoose.models.Lead || mongoose.model<LeadType>("Lead", LeadMongoSchema);

// ================= ORDER SCHEMA =================
const OrderMongoSchema = new Schema<OrderType>(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["Paid", "Pending", "Refunded"], default: "Paid" },
    paymentMethod: { type: String, default: "UPI / Razorpay" },
    transactionId: { type: String, required: true },
    receiptNumber: { type: String, required: true },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model<OrderType>("Order", OrderMongoSchema);

// ================= SETTINGS SCHEMA =================
const SettingsMongoSchema = new Schema<SettingsType>(
  {
    instituteName: { type: String, default: "ILI Foreign Languages Institute" },
    legalName: {
      type: String,
      default: "ILI Foreign Languages Institute Private Limited",
    },
    tagline: {
      type: String,
      default: "Central India's Benchmark for International Language Proficiency",
    },
    address: {
      type: String,
      default: "Apollo Tower, Mahatma Gandhi Road, New Palasia",
    },
    landmark: { type: String, default: "Opposite 56 Dukan Road, Near Industry House" },
    city: { type: String, default: "Indore" },
    state: { type: String, default: "Madhya Pradesh" },
    country: { type: String, default: "India" },
    postalCode: { type: String, default: "452001" },
    phone: { type: String, default: "+91 98260 12345" },
    altPhone: { type: String, default: "+91 731 4056789" },
    email: { type: String, default: "admissions@ililanguages.in" },
    admissionsEmail: { type: String, default: "counselor.indore@ililanguages.in" },
    whatsapp: { type: String, default: "+91 98260 12345" },
    officeHours: {
      type: String,
      default: "Monday – Saturday: 9:00 AM – 7:30 PM | Sunday: 10:00 AM – 2:00 PM",
    },
    bannerVisible: { type: Boolean, default: true },
    announcementText: {
      type: String,
      default:
        "Admission Open for Upcoming Weekend & Weekday Batches | In-Person at Apollo Tower Indore & Live Online",
    },
    registrationNumber: {
      type: String,
      default: "U80903MP2022PTC061234 (Sample Demo Registration)",
    },
    gstinPlaceholder: { type: String, default: "23AABCU9603R1ZN (Demo Placeholder)" },
    bunnyLibraryId: { type: String, default: "" },
    bunnyApiKey: {
      type: String,
      default: "",
    },
    bunnyPullZone: { type: String, default: "" },
  },
  { timestamps: true }
);

export const SettingsModel =
  mongoose.models.Settings ||
  mongoose.model<SettingsType>("Settings", SettingsMongoSchema);
