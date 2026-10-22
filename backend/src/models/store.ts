import {
  User,
  Course,
  Student,
  Lead,
  Order,
  InstituteSettings,
  CourseSection,
  Lecture,
  LeadStatus,
} from "./types";
import {
  initialUsers,
  initialCourses,
  initialStudents,
  initialLeads,
  initialOrders,
  initialInstituteSettings,
} from "../utils/seedData";
import {
  CourseModel,
  UserModel,
  StudentModel,
  LeadModel,
  OrderModel,
  SettingsModel,
} from "./schemas";

class DataStore {
  private users: User[] = [...initialUsers];
  private courses: Course[] = [...initialCourses];
  private students: Student[] = [...initialStudents];
  private leads: Lead[] = [];
  private orders: Order[] = [...initialOrders];
  private settings: InstituteSettings = { ...initialInstituteSettings };
  private isMongoSynced: boolean = false;

  /**
   * Loads all collections from MongoDB Atlas into the store
   */
  async loadFromMongo(): Promise<void> {
    try {
      console.log("Loading live records from MongoDB Atlas into platform store...");
      const [dbCourses, dbUsers, dbStudents, dbLeads, dbOrders, dbSettings] =
        await Promise.all([
          CourseModel.find().lean(),
          UserModel.find().lean(),
          StudentModel.find().lean(),
          LeadModel.find().lean(),
          OrderModel.find().lean(),
          SettingsModel.findOne().lean(),
        ]);

      if (dbCourses && dbCourses.length > 0) {
        this.courses = dbCourses as unknown as Course[];
      }
      if (dbUsers && dbUsers.length > 0) {
        this.users = dbUsers as unknown as User[];
      }
      if (dbStudents && dbStudents.length > 0) {
        this.students = dbStudents as unknown as Student[];
      }
      if (Array.isArray(dbLeads)) {
        this.leads = dbLeads as unknown as Lead[];
      }
      if (dbOrders && dbOrders.length > 0) {
        this.orders = dbOrders as unknown as Order[];
      }
      if (dbSettings) {
        this.settings = dbSettings as unknown as InstituteSettings;
      }

      this.isMongoSynced = true;
      console.log(
        `✓ MongoDB sync complete: ${this.courses.length} courses, ${this.users.length} users, ${this.students.length} students, ${this.leads.length} leads.`
      );
    } catch (err: any) {
      console.error("Failed to load records from MongoDB Atlas:", err.message);
    }
  }

  // ================= USERS =================
  findUserByEmail(email: string): User | undefined {
    const normalized = email.trim().toLowerCase();
    const aliasNormalized =
      normalized === "vermaraj01110@gmial.com" ? "vermaraj01110@gmail.com" : normalized;

    return this.users.find((u) => {
      const uEmail = u.email.toLowerCase();
      if (uEmail === normalized || uEmail === aliasNormalized) {
        return true;
      }
      if (
        u.role === "admin" &&
        (normalized === "admin" || normalized === "admin@ililanguages.in")
      ) {
        return true;
      }
      return false;
    });
  }

  findUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  createUser(user: User): User {
    this.users.push(user);
    UserModel.create(user).catch((err) =>
      console.error("MongoDB createUser async error:", err.message)
    );
    return user;
  }

  // ================= COURSES =================
  getAllCourses(): Course[] {
    return [...this.courses];
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.courses.find((c) => c.slug === slug);
  }

  createCourse(
    courseData: Omit<
      Course,
      "id" | "totalLectures" | "enrolledStudentsCount" | "sections"
    > & { sections?: CourseSection[] }
  ): Course {
    const rawSections = courseData.sections || [];
    const totalLectures = rawSections.reduce(
      (acc, s) => acc + (s.lectures?.length || 0),
      0
    );

    const courseId =
      (courseData as any).id ||
      `course-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const newCourse: Course = {
      ...courseData,
      id: courseId,
      totalLectures,
      enrolledStudentsCount: (courseData as any).enrolledStudentsCount || 0,
      visitorCount: (courseData as any).visitorCount || 0,
      views: (courseData as any).views || 0,
      sections: rawSections,
    };

    const existingIndex = this.courses.findIndex(
      (c) => c.id === newCourse.id || c.slug === newCourse.slug
    );
    if (existingIndex !== -1) {
      this.courses[existingIndex] = newCourse;
    } else {
      this.courses = [newCourse, ...this.courses];
    }

    // Persist to MongoDB Atlas using upsert by slug or id
    CourseModel.findOneAndUpdate(
      { $or: [{ id: newCourse.id }, { slug: newCourse.slug }] },
      newCourse,
      { upsert: true, returnDocument: "after" }
    ).catch((err) =>
      console.error("MongoDB createCourse upsert error:", err.message)
    );

    return newCourse;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | undefined {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    const merged = { ...this.courses[index], ...updates };
    const total = (merged.sections || []).reduce(
      (acc, s) => acc + (s.lectures?.length || 0),
      0
    );
    merged.totalLectures = total;

    this.courses[index] = merged;

    // Persist to MongoDB Atlas asynchronously
    CourseModel.findOneAndUpdate({ id }, merged, { upsert: true }).catch((err) =>
      console.error("MongoDB updateCourse async error:", err.message)
    );

    return merged;
  }

  deleteCourse(id: string): boolean {
    const initialLen = this.courses.length;
    this.courses = this.courses.filter((c) => c.id !== id);
    const deleted = this.courses.length < initialLen;

    if (deleted) {
      CourseModel.deleteOne({ id }).catch((err) =>
        console.error("MongoDB deleteCourse async error:", err.message)
      );
    }

    return deleted;
  }

  addSection(courseId: string, title: string): CourseSection | undefined {
    const course = this.getCourseById(courseId);
    if (!course) return undefined;

    const newSection: CourseSection = {
      id: `sec-${Date.now()}`,
      title,
      order: (course.sections?.length || 0) + 1,
      lectures: [],
    };

    const updatedSections = [...(course.sections || []), newSection];
    this.updateCourse(courseId, { sections: updatedSections });
    return newSection;
  }

  deleteSection(courseId: string, sectionId: string): boolean {
    const course = this.getCourseById(courseId);
    if (!course) return false;

    const updatedSections = (course.sections || []).filter((s) => s.id !== sectionId);
    this.updateCourse(courseId, { sections: updatedSections });
    return true;
  }

  addLecture(
    courseId: string,
    sectionId: string,
    lectureData: Omit<Lecture, "id" | "order">
  ): Lecture | undefined {
    const course = this.getCourseById(courseId);
    if (!course) return undefined;

    const section = (course.sections || []).find((s) => s.id === sectionId);
    if (!section) return undefined;

    const newLecture: Lecture = {
      ...lectureData,
      id: `lec-${Date.now()}`,
      order: (section.lectures?.length || 0) + 1,
    };

    section.lectures = [...(section.lectures || []), newLecture];
    this.updateCourse(courseId, { sections: course.sections });
    return newLecture;
  }

  deleteLecture(courseId: string, sectionId: string, lectureId: string): boolean {
    const course = this.getCourseById(courseId);
    if (!course) return false;

    const section = (course.sections || []).find((s) => s.id === sectionId);
    if (!section) return false;

    section.lectures = (section.lectures || []).filter((l) => l.id !== lectureId);
    this.updateCourse(courseId, { sections: course.sections });
    return true;
  }

  // ================= STUDENTS =================
  getAllStudents(): Student[] {
    return [...this.students];
  }

  getStudentById(id: string): Student | undefined {
    return this.students.find((s) => s.id === id);
  }

  getStudentByEmail(email: string): Student | undefined {
    return this.students.find(
      (s) => s.email.toLowerCase() === email.trim().toLowerCase()
    );
  }

  enrollStudentInCourse(studentId: string, courseId: string): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    if (!student.enrolledCourseIds.includes(courseId)) {
      student.enrolledCourseIds.push(courseId);
      if (!student.progress[courseId]) {
        student.progress[courseId] = {
          completedLectureIds: [],
          lastAccessedAt: new Date().toISOString(),
        };
      }
      StudentModel.findOneAndUpdate({ id: studentId }, student, { upsert: true }).catch(
        (err) => console.error("MongoDB enrollStudent async error:", err.message)
      );
    }

    return student;
  }

  markLectureCompleted(
    studentId: string,
    courseId: string,
    lectureId: string
  ): Student | undefined {
    const student = this.getStudentById(studentId);
    if (!student) return undefined;

    if (!student.progress[courseId]) {
      student.progress[courseId] = { completedLectureIds: [] };
    }

    const prog = student.progress[courseId];
    if (!prog.completedLectureIds.includes(lectureId)) {
      prog.completedLectureIds.push(lectureId);
    }
    prog.lastLectureId = lectureId;
    prog.lastAccessedAt = new Date().toISOString();

    StudentModel.findOneAndUpdate({ id: studentId }, student, { upsert: true }).catch(
      (err) => console.error("MongoDB markLecture async error:", err.message)
    );

    return student;
  }

  // ================= LEADS =================
  getAllLeads(): Lead[] {
    return [...this.leads];
  }

  getLeadById(id: string): Lead | undefined {
    return this.leads.find((l) => l.id === id);
  }

  createLead(
    leadData: Omit<Lead, "id" | "notes" | "status" | "createdAt">
  ): Lead {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: "New",
      notes: [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    this.leads = [newLead, ...this.leads];

    LeadModel.create(newLead).catch((err) =>
      console.error("MongoDB createLead async error:", err.message)
    );

    return newLead;
  }

  updateLeadStatus(id: string, status: LeadStatus): Lead | undefined {
    const lead = this.getLeadById(id);
    if (!lead) return undefined;

    lead.status = status;

    LeadModel.findOneAndUpdate({ id }, { status }).catch((err) =>
      console.error("MongoDB updateLeadStatus async error:", err.message)
    );

    return lead;
  }

  addLeadNote(id: string, text: string, author: string = "Admin"): Lead | undefined {
    const lead = this.getLeadById(id);
    if (!lead) return undefined;

    const note = {
      id: `note-${Date.now()}`,
      text,
      date: new Date().toISOString().split("T")[0],
      author,
    };

    lead.notes = [note, ...lead.notes];

    LeadModel.findOneAndUpdate({ id }, { notes: lead.notes }).catch((err) =>
      console.error("MongoDB addLeadNote async error:", err.message)
    );

    return lead;
  }

  deleteLead(id: string): boolean {
    const prevLen = this.leads.length;
    this.leads = this.leads.filter((l) => l.id !== id);
    LeadModel.deleteOne({ id }).catch((err) =>
      console.error("MongoDB deleteLead async error:", err.message)
    );
    return this.leads.length < prevLen;
  }

  clearAllLeads(): void {
    this.leads = [];
    LeadModel.deleteMany({}).catch((err) =>
      console.error("MongoDB clearAllLeads async error:", err.message)
    );
  }

  // ================= ORDERS =================
  getAllOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  createOrder(data: {
    studentName: string;
    studentEmail: string;
    courseId: string;
    courseTitle: string;
    amount: number;
    paymentMethod?: string;
    currency?: string;
    status?: "Paid" | "Pending" | "Refunded";
    transactionId?: string;
  }): Order {
    const now = new Date();
    const receiptNum = `ILI-REC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      ...data,
      id: `ord-${Date.now()}`,
      currency: data.currency || "INR",
      status: data.status || "Paid",
      paymentMethod: data.paymentMethod || "UPI / Razorpay",
      transactionId: data.transactionId || `TXN-${Date.now()}`,
      receiptNumber: receiptNum,
      createdAt: now.toISOString().split("T")[0],
    };

    this.orders = [newOrder, ...this.orders];

    OrderModel.create(newOrder).catch((err) =>
      console.error("MongoDB createOrder async error:", err.message)
    );

    return newOrder;
  }

  // ================= SETTINGS =================
  getSettings(): InstituteSettings {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<InstituteSettings>): InstituteSettings {
    this.settings = { ...this.settings, ...updates };

    SettingsModel.findOneAndUpdate({}, this.settings, { upsert: true }).catch((err) =>
      console.error("MongoDB updateSettings async error:", err.message)
    );

    return { ...this.settings };
  }
}

export const store = new DataStore();
