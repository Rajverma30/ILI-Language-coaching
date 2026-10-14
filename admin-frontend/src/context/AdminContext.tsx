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
import { adminApi } from "@/lib/api";

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AdminContextType {
  // Auth (Admin only)
  currentUser: User | null;
  isLoadingAuth: boolean;
  loginAdmin: (identifier: string, pass: string) => Promise<AuthResult>;
  logout: () => void;

  // Courses CRUD
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
  addCourse: (
    course: Omit<Course, "id" | "totalLectures" | "enrolledStudentsCount" | "sections"> & {
      sections?: CourseSection[];
    }
  ) => Course;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  addSection: (courseId: string, title: string) => void;
  deleteSection: (courseId: string, sectionId: string) => void;
  addLecture: (courseId: string, sectionId: string, lecture: Omit<Lecture, "id" | "order">) => void;
  deleteLecture: (courseId: string, sectionId: string, lectureId: string) => void;

  // Students
  students: Student[];

  // Leads
  leads: Lead[];
  refreshLeads: () => Promise<void>;
  addLead: (lead: Omit<Lead, "id" | "notes" | "status" | "createdAt">) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  addLeadNote: (leadId: string, noteText: string, author?: string) => void;
  deleteLead: (leadId: string) => Promise<void>;
  clearAllLeads: () => Promise<void>;

  // Orders
  orders: Order[];

  // Settings
  settings: InstituteSettings;
  updateSettings: (updates: Partial<InstituteSettings>) => void;
  resetDemoData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ADMIN_USER: "ili_admin_user",
  COURSES: "ili_admin_courses",
  STUDENTS: "ili_admin_students",
  LEADS: "ili_admin_leads",
  ORDERS: "ili_admin_orders",
  SETTINGS: "ili_admin_settings",
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, startTransition] = useTransition();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [settings, setSettings] = useState<InstituteSettings>(initialInstituteSettings);

  // Initialize on mount
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const savedUser = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.role === "admin") {
            setCurrentUser(parsed);
          }
        }

        let localCourses: Course[] = [];
        const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
        if (savedCourses) {
          try {
            localCourses = JSON.parse(savedCourses);
            setCourses(localCourses);
          } catch {}
        }

        const savedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
        if (savedStudents) setStudents(JSON.parse(savedStudents));

        const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
        if (savedLeads) setLeads(JSON.parse(savedLeads));

        const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        if (savedOrders) setOrders(JSON.parse(savedOrders));

        const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (savedSettings) setSettings(JSON.parse(savedSettings));

        // Attempt live sync from backend API
        const backendCourses = await adminApi.getCourses();
        if (backendCourses.success && Array.isArray(backendCourses.data) && backendCourses.data.length > 0) {
          // Merge: Preserve any local courses not yet on backend
          const backendIds = new Set(backendCourses.data.map((c: any) => c.id || c.slug));
          const unsynced = localCourses.filter((lc) => !backendIds.has(lc.id) && !backendIds.has(lc.slug));

          // Auto-sync unsynced local courses to backend
          for (const unsyncedCourse of unsynced) {
            adminApi.createCourse(unsyncedCourse).catch(() => {});
          }

          const combined = [...unsynced, ...backendCourses.data];
          setCourses(combined);
          saveToStorage(STORAGE_KEYS.COURSES, combined);
        }

        const backendLeads = await adminApi.getLeads();
        if (backendLeads.success && Array.isArray(backendLeads.data)) {
          setLeads(backendLeads.data);
          saveToStorage(STORAGE_KEYS.LEADS, backendLeads.data);
        }

        const backendStudents = await adminApi.getStudents();
        if (backendStudents.success && Array.isArray(backendStudents.data) && backendStudents.data.length > 0) {
          setStudents(backendStudents.data);
        }
      } catch {
        // LocalStorage fallback
      } finally {
        setIsLoadingAuth(false);
      }
    }, 0);

    // Periodically poll backend for new leads every 5 seconds
    const leadInterval = setInterval(async () => {
      try {
        const res = await adminApi.getLeads();
        if (res.success && Array.isArray(res.data)) {
          setLeads(res.data);
          saveToStorage(STORAGE_KEYS.LEADS, res.data);
        }
      } catch {}
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(leadInterval);
    };
  }, []);

  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore
    }
  };

  // Admin authentication
  const loginAdmin = async (identifier: string, pass: string): Promise<AuthResult> => {
    const trimmedUser = identifier.trim().toLowerCase();
    const trimmedPass = pass.trim();

    if (!trimmedUser || !trimmedPass) {
      return { success: false, error: "Please provide both admin username/email and password." };
    }

    // Try backend API first
    const apiRes = await adminApi.login(trimmedUser, trimmedPass);
    if (apiRes.success && apiRes.data) {
      if (apiRes.data.user.role !== "admin") {
        return {
          success: false,
          error: "Access denied. Administrative privileges are required.",
        };
      }

      adminApi.setToken(apiRes.data.token);
      const adminUser: User = {
        id: apiRes.data.user.id,
        name: apiRes.data.user.name,
        email: apiRes.data.user.email,
        role: "admin",
        createdAt: new Date().toISOString(),
      };

      startTransition(() => {
        setCurrentUser(adminUser);
        saveToStorage(STORAGE_KEYS.ADMIN_USER, adminUser);
      });

      return { success: true };
    }

    // Local development fallback
    if (
      (trimmedUser === "admin" || trimmedUser === "admin@ililanguages.in") &&
      (trimmedPass === "12345" || trimmedPass === "admin" || trimmedPass === "admin123")
    ) {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin Desk (Indore Campus)",
        email: "admin@ililanguages.in",
        role: "admin",
        createdAt: "2024-01-01",
      };

      startTransition(() => {
        setCurrentUser(adminUser);
        saveToStorage(STORAGE_KEYS.ADMIN_USER, adminUser);
      });

      return { success: true };
    }

    return {
      success: false,
      error: apiRes.error || "Invalid administrative credentials.",
    };
  };

  const logout = () => {
    startTransition(() => {
      setCurrentUser(null);
      adminApi.setToken(null);
      try {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
      } catch {
        // ignore
      }
    });
  };

  const getCourseById = (id: string) => {
    return courses.find((c) => c.id === id);
  };

  const addCourse = (
    courseData: Omit<Course, "id" | "totalLectures" | "enrolledStudentsCount" | "sections"> & {
      sections?: CourseSection[];
    }
  ): Course => {
    const rawSections = courseData.sections || [];
    const totalLectures = rawSections.reduce((acc, s) => acc + (s.lectures?.length || 0), 0);

    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      totalLectures,
      enrolledStudentsCount: 0,
      sections: rawSections,
    };

    const updated = [newCourse, ...courses];
    setCourses(updated);
    saveToStorage(STORAGE_KEYS.COURSES, updated);

    // Call backend API to persist to MongoDB Atlas
    adminApi
      .createCourse(newCourse)
      .then((res) => {
        if (res.success && res.data) {
          console.log("Course saved to MongoDB Atlas:", res.data);
        }
      })
      .catch((err) => {
        console.warn("Backend course sync notice:", err);
      });

    return newCourse;
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    adminApi.updateCourse(id, updates).catch(() => {});

    const updated = courses.map((c) => {
      if (c.id === id) {
        const merged = { ...c, ...updates };
        const total = (merged.sections || []).reduce((acc, s) => acc + (s.lectures?.length || 0), 0);
        return { ...merged, totalLectures: total };
      }
      return c;
    });
    setCourses(updated);
    saveToStorage(STORAGE_KEYS.COURSES, updated);
  };

  const deleteCourse = (id: string) => {
    adminApi.deleteCourse(id).catch(() => {});

    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    saveToStorage(STORAGE_KEYS.COURSES, updated);
  };

  const addSection = (courseId: string, title: string) => {
    adminApi.addSection(courseId, title).catch(() => {});

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
    adminApi.deleteSection(courseId, sectionId).catch(() => {});

    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const updatedSections = (course.sections || []).filter((s) => s.id !== sectionId);
    updateCourse(courseId, { sections: updatedSections });
  };

  const addLecture = (courseId: string, sectionId: string, lectureData: Omit<Lecture, "id" | "order">) => {
    adminApi.addLecture(courseId, sectionId, lectureData).catch(() => {});

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
    adminApi.deleteLecture(courseId, sectionId, lectureId).catch(() => {});

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

  const refreshLeads = async () => {
    try {
      const res = await adminApi.getLeads();
      if (res.success && Array.isArray(res.data)) {
        setLeads(res.data);
        saveToStorage(STORAGE_KEYS.LEADS, res.data);
      }
    } catch {}
  };

  const addLead = (leadData: Omit<Lead, "id" | "notes" | "status" | "createdAt">): Lead => {
    adminApi.createLead(leadData).catch(() => {});

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
    adminApi.updateLeadStatus(leadId, status).catch(() => {});

    const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
  };

  const addLeadNote = (leadId: string, noteText: string, author: string = "Admin Team") => {
    adminApi.addLeadNote(leadId, noteText, author).catch(() => {});

    const updated = leads.map((l) => {
      if (l.id === leadId) {
        const note = {
          id: `note-${Date.now()}`,
          text: noteText,
          date: new Date().toISOString(),
          author,
        };
        return { ...l, notes: [note, ...l.notes] };
      }
      return l;
    });
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
  };

  const deleteLead = async (leadId: string) => {
    adminApi.deleteLead(leadId).catch(() => {});
    const updated = leads.filter((l) => l.id !== leadId);
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
  };

  const clearAllLeads = async () => {
    adminApi.clearAllLeads().catch(() => {});
    setLeads([]);
    saveToStorage(STORAGE_KEYS.LEADS, []);
  };

  const updateSettings = (updates: Partial<InstituteSettings>) => {
    adminApi.updateSettings(updates).catch(() => {});

    const updated = { ...settings, ...updates };
    setSettings(updated);
    saveToStorage(STORAGE_KEYS.SETTINGS, updated);
  };

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
    <AdminContext.Provider
      value={{
        currentUser,
        isLoadingAuth,
        loginAdmin,
        logout,
        courses,
        getCourseById,
        addCourse,
        updateCourse,
        deleteCourse,
        addSection,
        deleteSection,
        addLecture,
        deleteLecture,
        students,
        leads,
        refreshLeads,
        addLead,
        updateLeadStatus,
        addLeadNote,
        deleteLead,
        clearAllLeads,
        orders,
        settings,
        updateSettings,
        resetDemoData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
