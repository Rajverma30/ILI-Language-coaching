import { Course, Student, Lead, Order, InstituteSettings, User } from "@/types";

/**
 * Service & Repository Boundaries for ILI Language Platform
 * These interfaces define the contract that the MongoDB Atlas repository
 * and server APIs will implement once persistent backend storage is activated.
 */

export interface ICourseRepository {
  findAll(filter?: { language?: string; level?: string; search?: string }): Promise<Course[]>;
  findBySlug(slug: string): Promise<Course | null>;
  findById(id: string): Promise<Course | null>;
  create(data: Omit<Course, "id">): Promise<Course>;
  update(id: string, updates: Partial<Course>): Promise<Course | null>;
  delete(id: string): Promise<boolean>;
}

export interface IStudentRepository {
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  updateProgress(studentId: string, courseId: string, completedLectureId: string): Promise<Student>;
  enrollCourse(studentId: string, courseId: string): Promise<Student>;
}

export interface ILeadRepository {
  findAll(status?: string): Promise<Lead[]>;
  findById(id: string): Promise<Lead | null>;
  create(lead: Omit<Lead, "id" | "createdAt" | "notes">): Promise<Lead>;
  updateStatus(id: string, status: string): Promise<Lead | null>;
  addNote(id: string, noteText: string, author: string): Promise<Lead | null>;
}

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  updatePaymentStatus(id: string, status: "Paid" | "Pending" | "Refunded", transactionId: string): Promise<Order | null>;
}

export interface ISettingsRepository {
  getSettings(): Promise<InstituteSettings>;
  updateSettings(settings: Partial<InstituteSettings>): Promise<InstituteSettings>;
}

export interface IAuthService {
  validateUser(email: string, passwordHash: string): Promise<User | null>;
  createSessionToken(user: User): Promise<string>;
  verifySessionToken(token: string): Promise<User | null>;
}
