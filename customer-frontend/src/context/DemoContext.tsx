"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import {
  User,
  Course,
  Student,
  Lead,
  Order,
  InstituteSettings,
} from "@/types";
import {
  initialCourses,
  initialStudents,
  initialLeads,
  initialOrders,
  initialInstituteSettings,
} from "@/data/mockData";
import { api } from "@/lib/api";

interface AuthResult {
  success: boolean;
  error?: string;
}

interface CustomerContextType {
  // Auth (Student only)
  currentUser: User | null;
  isLoadingAuth: boolean;
  loginStudent: (email: string, pass: string) => Promise<AuthResult>;
  logout: () => void;

  // Courses
  courses: Course[];
  getCourseBySlug: (slug: string) => Course | undefined;
  getCourseById: (id: string) => Course | undefined;

  // Student progress
  currentStudent: Student | null;
  markLectureCompleted: (courseId: string, lectureId: string) => void;
  getStudentCourseProgress: (studentId: string, courseId: string) => {
    percentage: number;
    completedCount: number;
    totalLectures: number;
    isCompleted: (lectureId: string) => boolean;
  };

  // Leads / Enquiries
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "notes" | "status" | "createdAt">) => Lead;

  // Orders
  orders: Order[];
  createOrder: (courseId: string, amount: number) => Order;
  createDemoOrder: (courseId: string, amount: number) => Order;

  // Settings
  settings: InstituteSettings;
}

const DemoContext = createContext<CustomerContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "ili_student_user",
  COURSES: "ili_customer_courses",
  STUDENTS: "ili_customer_students",
  LEADS: "ili_customer_leads",
  ORDERS: "ili_customer_orders",
  SETTINGS: "ili_customer_settings",
};

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [settings, setSettings] = useState<InstituteSettings>(initialInstituteSettings);

  // Initialize from storage or backend on mount
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.role === "student") {
            setCurrentUser(parsed);
          }
        }

        const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents));
        }

        const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
        if (savedLeads) {
          setLeads(JSON.parse(savedLeads));
        }

        const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }

        const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
        if (savedCourses) {
          try {
            setCourses(JSON.parse(savedCourses));
          } catch {
            // Ignore parse errors
          }
        }

        // Try syncing fresh courses from backend API
        const backendCourses = await api.getCourses();
        if (backendCourses.success && Array.isArray(backendCourses.data) && backendCourses.data.length > 0) {
          setCourses(backendCourses.data);
          saveToStorage(STORAGE_KEYS.COURSES, backendCourses.data);
        }

        // Try syncing settings from backend API
        const backendSettings = await api.getSettings();
        if (backendSettings.success && backendSettings.data) {
          setSettings(backendSettings.data);
        }
      } catch {
        // Fallback to in-memory seed data
      } finally {
        setIsLoadingAuth(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore
    }
  };

  // Student authentication with backend API integration & fallback
  const loginStudent = async (email: string, pass: string): Promise<AuthResult> => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (!trimmedEmail || !trimmedPass) {
      return { success: false, error: "Please enter your student email and password." };
    }

    // Try backend API first
    const apiRes = await api.login(trimmedEmail, trimmedPass);
    if (apiRes.success && apiRes.data) {
      if (apiRes.data.user.role !== "student") {
        return {
          success: false,
          error: "Access denied. This portal is strictly for enrolled student accounts.",
        };
      }

      api.setToken(apiRes.data.token);
      const studentUser: User = {
        id: apiRes.data.user.id,
        name: apiRes.data.user.name,
        email: apiRes.data.user.email,
        role: "student",
        createdAt: new Date().toISOString(),
      };

      startTransition(() => {
        setCurrentUser(studentUser);
        saveToStorage(STORAGE_KEYS.USER, studentUser);
      });

      return { success: true };
    }

    // Local fallback for local development testing
    if (
      (trimmedEmail === "vermaraj01110@gmail.com" || trimmedEmail === "vermaraj01110@gmial.com") &&
      trimmedPass === "12345"
    ) {
      const studentUser: User = {
        id: "std-raj-1",
        name: "Raj Verma",
        email: "vermaraj01110@gmail.com",
        role: "student",
        phone: "+91 98270 98765",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        createdAt: "2024-09-15",
      };

      startTransition(() => {
        setCurrentUser(studentUser);
        saveToStorage(STORAGE_KEYS.USER, studentUser);
      });

      return { success: true };
    }

    return {
      success: false,
      error: apiRes.error || "Invalid student credentials. Please check your email and password.",
    };
  };

  const logout = () => {
    startTransition(() => {
      setCurrentUser(null);
      api.setToken(null);
      try {
        localStorage.removeItem(STORAGE_KEYS.USER);
      } catch {
        // ignore
      }
    });
  };

  const currentStudent = currentUser?.role === "student"
    ? students.find((s) => s.email.toLowerCase() === currentUser.email.toLowerCase()) || students[0]
    : null;

  const getCourseBySlug = (slug: string) => {
    return courses.find((c) => c.slug === slug);
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id);
  };

  const markLectureCompleted = async (courseId: string, lectureId: string) => {
    if (!currentStudent) return;

    // Send update to backend if online
    api.markLectureCompleted(currentStudent.id, courseId, lectureId).catch(() => {});

    // Update locally
    const existingProgress = currentStudent.progress[courseId] || { completedLectureIds: [] };
    const completedSet = new Set(existingProgress.completedLectureIds);
    if (completedSet.has(lectureId)) {
      completedSet.delete(lectureId);
    } else {
      completedSet.add(lectureId);
    }

    const updatedProgress = {
      ...currentStudent.progress,
      [courseId]: {
        ...existingProgress,
        completedLectureIds: Array.from(completedSet),
        lastLectureId: lectureId,
        lastAccessedAt: new Date().toISOString(),
      },
    };

    const updatedStudents = students.map((s) => {
      if (s.id === currentStudent.id) {
        return { ...s, progress: updatedProgress };
      }
      return s;
    });

    setStudents(updatedStudents);
    saveToStorage(STORAGE_KEYS.STUDENTS, updatedStudents);
  };

  const getStudentCourseProgress = (studentId: string, courseId: string) => {
    const student = students.find((s) => s.id === studentId);
    const course = courses.find((c) => c.id === courseId);

    const totalLectures = (course?.sections || []).reduce((acc, s) => acc + (s.lectures?.length || 0), 0) || 1;
    const completedIds = student?.progress?.[courseId]?.completedLectureIds || [];
    const completedCount = completedIds.length;
    const percentage = Math.min(100, Math.round((completedCount / totalLectures) * 100));

    return {
      percentage,
      completedCount,
      totalLectures,
      isCompleted: (lecId: string) => completedIds.includes(lecId),
    };
  };

  const addLead = (leadData: Omit<Lead, "id" | "notes" | "status" | "createdAt">): Lead => {
    // Attempt backend sync in background
    api.submitLead(leadData).catch(() => {});

    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: "New",
      notes: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
    return newLead;
  };

  const createOrder = (courseId: string, amount: number): Order => {
    const course = courses.find((c) => c.id === courseId);
    const courseTitle = course?.title || "Demo Language Course";

    api.createOrder({ courseId, courseTitle, amount }).catch(() => {});

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      receiptNumber: `ILI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: currentUser?.name || "Raj Verma",
      studentEmail: currentUser?.email || "vermaraj01110@gmail.com",
      courseId,
      courseTitle,
      amount,
      currency: "INR",
      status: "Paid",
      paymentMethod: "Razorpay (Online)",
      transactionId: `pay_ili_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);

    if (currentStudent && !currentStudent.enrolledCourseIds.includes(courseId)) {
      const updatedStudents = students.map((s) => {
        if (s.id === currentStudent.id) {
          return {
            ...s,
            enrolledCourseIds: [...s.enrolledCourseIds, courseId],
          };
        }
        return s;
      });
      setStudents(updatedStudents);
      saveToStorage(STORAGE_KEYS.STUDENTS, updatedStudents);
    }

    return newOrder;
  };

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        isLoadingAuth,
        loginStudent,
        logout,
        courses,
        getCourseBySlug,
        getCourseById,
        currentStudent,
        markLectureCompleted,
        getStudentCourseProgress,
        leads,
        addLead,
        orders,
        createOrder,
        createDemoOrder: createOrder,
        settings,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
};
