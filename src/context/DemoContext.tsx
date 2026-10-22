"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import {
  User,
  Course,
  Student,
  Lead,
  LeadStatus,
  Order,
  InstituteSettings,
  CourseSection,
  Lecture,
} from "@/types";
import {
  initialCourses,
  initialStudents,
  initialLeads,
  initialOrders,
  initialInstituteSettings,
} from "@/data/mockData";

interface AuthResult {
  success: boolean;
  error?: string;
}

interface DemoContextType {
  // Auth
  currentUser: User | null;
  isLoadingAuth: boolean;
  loginStudent: (email: string, pass: string) => Promise<AuthResult>;
  loginAdmin: (user: string, pass: string) => Promise<AuthResult>;
  logout: () => void;

  // Courses
  courses: Course[];
  getCourseBySlug: (slug: string) => Course | undefined;
  getCourseById: (id: string) => Course | undefined;
  addCourse: (course: Omit<Course, "id" | "totalLectures" | "enrolledStudentsCount" | "sections">) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addSection: (courseId: string, title: string) => void;
  deleteSection: (courseId: string, sectionId: string) => void;
  addLecture: (courseId: string, sectionId: string, lecture: Omit<Lecture, "id" | "order">) => void;
  deleteLecture: (courseId: string, sectionId: string, lectureId: string) => void;

  // Student progress
  students: Student[];
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
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  addLeadNote: (leadId: string, noteText: string, author?: string) => void;

  // Orders
  orders: Order[];
  createDemoOrder: (courseId: string, amount: number) => Order;

  // Settings
  settings: InstituteSettings;
  updateSettings: (updates: Partial<InstituteSettings>) => void;

  // Reset
  resetDemoData: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: "ili_demo_user",
  COURSES: "ili_demo_courses",
  STUDENTS: "ili_demo_students",
  LEADS: "ili_demo_leads",
  ORDERS: "ili_demo_orders",
  SETTINGS: "ili_demo_settings",
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

  // Initialize from LocalStorage safely on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }

        const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
        if (savedCourses) {
          setCourses(JSON.parse(savedCourses));
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

        const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch {
        // LocalStorage unavailable or parsing error; keep in-memory mock data
      } finally {
        setIsLoadingAuth(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Sync helpers
  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore storage errors in demo mode
    }
  };

  // Auth implementation
  const loginStudent = async (email: string, pass: string): Promise<AuthResult> => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (
      (trimmedEmail !== "vermaraj01110@gmail.com" && trimmedEmail !== "vermaraj01110@gmial.com") ||
      trimmedPass !== "12345"
    ) {
      return {
        success: false,
        error: "Invalid student credentials. For this demo, please use email: vermaraj01110@gmail.com and password: 12345",
      };
    }

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
  };

  const loginAdmin = async (username: string, pass: string): Promise<AuthResult> => {
    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if ((trimmedUser !== "admin" && trimmedUser !== "admin@ililanguages.in") || trimmedPass !== "12345") {
      return {
        success: false,
        error: "Invalid administrative credentials. For this demo, please use username: admin and password: 12345",
      };
    }

    const adminUser: User = {
      id: "admin-1",
      name: "Admin Desk (Indore Campus)",
      email: "admin@ililanguages.in",
      role: "admin",
      createdAt: "2024-01-01",
    };

    startTransition(() => {
      setCurrentUser(adminUser);
      saveToStorage(STORAGE_KEYS.USER, adminUser);
    });

    return { success: true };
  };

  const logout = () => {
    startTransition(() => {
      setCurrentUser(null);
      try {
        localStorage.removeItem(STORAGE_KEYS.USER);
      } catch {
        // ignore
      }
    });
  };

  // Current logged in student entity
  const currentStudent = currentUser?.role === "student"
    ? students.find((s) => s.email.toLowerCase() === currentUser.email.toLowerCase()) || students[0]
    : null;

  // Course operations
  const getCourseBySlug = (slug: string) => {
    return courses.find((c) => c.slug === slug);
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id);
  };

  const addCourse = (
    courseData: Omit<Course, "id" | "totalLectures" | "enrolledStudentsCount" | "sections">
  ): Course => {
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      totalLectures: 0,
      enrolledStudentsCount: 0,
      sections: [],
    };
    const updated = [newCourse, ...courses];
    setCourses(updated);
    saveToStorage(STORAGE_KEYS.COURSES, updated);
    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    const updated = courses.map((c) => {
      if (c.id === id) {
        const merged = { ...c, ...updates };
        // recalculate lecture count
        const total = (merged.sections || []).reduce((acc, s) => acc + (s.lectures?.length || 0), 0);
        return { ...merged, totalLectures: total };
      }
      return c;
    });
    setCourses(updated);
    saveToStorage(STORAGE_KEYS.COURSES, updated);
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    saveToStorage(STORAGE_KEYS.COURSES, updated);
  };

  const addSection = (courseId: string, title: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const newSection: CourseSection = {
      id: `sec-${Date.now()}`,
      title,
      order: (course.sections?.length || 0) + 1,
      lectures: [],
    };

    const updatedSections = [...(course.sections || []), newSection];
    updateCourse(courseId, { sections: updatedSections });
  };

  const deleteSection = (courseId: string, sectionId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const updatedSections = (course.sections || []).filter((s) => s.id !== sectionId);
    updateCourse(courseId, { sections: updatedSections });
  };

  const addLecture = (courseId: string, sectionId: string, lectureData: Omit<Lecture, "id" | "order">) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const updatedSections = (course.sections || []).map((sec) => {
      if (sec.id === sectionId) {
        const newLec: Lecture = {
          ...lectureData,
          id: `lec-${Date.now()}`,
          order: (sec.lectures?.length || 0) + 1,
        };
        return {
          ...sec,
          lectures: [...(sec.lectures || []), newLec],
        };
      }
      return sec;
    });

    updateCourse(courseId, { sections: updatedSections });
  };

  const deleteLecture = (courseId: string, sectionId: string, lectureId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const updatedSections = (course.sections || []).map((sec) => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          lectures: (sec.lectures || []).filter((l) => l.id !== lectureId),
        };
      }
      return sec;
    });

    updateCourse(courseId, { sections: updatedSections });
  };

  // Student progress
  const markLectureCompleted = (courseId: string, lectureId: string) => {
    if (!currentStudent) return;

    const existingProgress = currentStudent.progress[courseId] || { completedLectureIds: [] };
    const completedSet = new Set(existingProgress.completedLectureIds);
    if (completedSet.has(lectureId)) {
      completedSet.delete(lectureId); // toggle
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

  // Leads
  const addLead = (leadData: Omit<Lead, "id" | "notes" | "status" | "createdAt">): Lead => {
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

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
  };

  const addLeadNote = (leadId: string, noteText: string, author: string = "Admin Team") => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        const note = {
          id: `note-${Date.now()}`,
          text: noteText,
          date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          author,
        };
        return { ...l, notes: [note, ...l.notes] };
      }
      return l;
    });
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
  };

  // Orders
  const createDemoOrder = (courseId: string, amount: number): Order => {
    const course = courses.find((c) => c.id === courseId);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      receiptNumber: `ILI-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      studentName: currentUser?.name || "Raj Verma",
      studentEmail: currentUser?.email || "vermaraj01110@gmail.com",
      courseId,
      courseTitle: course?.title || "Demo Language Course",
      amount,
      currency: "INR",
      status: "Paid",
      paymentMethod: "Razorpay (Demo Mock)",
      transactionId: `pay_demo_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);

    // If current student, enroll them
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

  // Settings
  const updateSettings = (updates: Partial<InstituteSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    saveToStorage(STORAGE_KEYS.SETTINGS, updated);
  };

  // Reset
  const resetDemoData = () => {
    startTransition(() => {
      setCourses(initialCourses);
      setStudents(initialStudents);
      setLeads(initialLeads);
      setOrders(initialOrders);
      setSettings(initialInstituteSettings);
      try {
        localStorage.removeItem(STORAGE_KEYS.COURSES);
        localStorage.removeItem(STORAGE_KEYS.STUDENTS);
        localStorage.removeItem(STORAGE_KEYS.LEADS);
        localStorage.removeItem(STORAGE_KEYS.ORDERS);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      } catch {
        // ignore
      }
    });
  };

  return (
    <DemoContext.Provider
      value={{
        currentUser,
        isLoadingAuth,
        loginStudent,
        loginAdmin,
        logout,
        courses,
        getCourseBySlug,
        getCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        addSection,
        deleteSection,
        addLecture,
        deleteLecture,
        students,
        currentStudent,
        markLectureCompleted,
        getStudentCourseProgress,
        leads,
        addLead,
        updateLeadStatus,
        addLeadNote,
        orders,
        createDemoOrder,
        settings,
        updateSettings,
        resetDemoData,
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
