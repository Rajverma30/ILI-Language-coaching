const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    // Relative path proxied by Next.js rewrites to backend - works on any mobile or LAN device
    return "/api-backend";
  }
  return "http://127.0.0.1:5000/api";
};

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("ili_student_token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("ili_student_token", token);
      } else {
        localStorage.removeItem("ili_student_token");
      }
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      this.token = localStorage.getItem("ili_student_token");
    }
    return this.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; error?: string }> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const baseUrl = getApiBaseUrl();

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const json = await res.json();
      return json;
    } catch {
      return {
        success: false,
        error: "Network error: Unable to reach backend server.",
      };
    }
  }

  // Auth
  async login(identifier: string, pass: string) {
    return this.request<{ token: string; user: { id: string; name: string; email: string; role: string } }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ identifier, password: pass }),
      }
    );
  }

  async getMe() {
    return this.request<{ id: string; name: string; email: string; role: string }>("/auth/me");
  }

  // Courses
  async getCourses() {
    return this.request<any[]>("/courses");
  }

  async getCourseBySlug(slug: string) {
    return this.request<any>(`/courses/slug/${slug}`);
  }

  // Student progress
  async getStudentProgress(studentId: string, courseId: string) {
    return this.request<{ percentage: number; completedCount: number; totalLectures: number; completedLectureIds: string[] }>(
      `/students/${studentId}/progress/${courseId}`
    );
  }

  async markLectureCompleted(studentId: string, courseId: string, lectureId: string) {
    return this.request<any>(`/students/${studentId}/progress/${courseId}/complete`, {
      method: "POST",
      body: JSON.stringify({ lectureId }),
    });
  }

  // Leads
  async submitLead(leadData: {
    fullName: string;
    email: string;
    phone: string;
    courseInterest?: string;
    preferredSlot?: string;
    preferredContactMethod?: string;
    message?: string;
    source?: string;
  }) {
    return this.request<any>("/leads", {
      method: "POST",
      body: JSON.stringify(leadData),
    });
  }

  // Orders
  async createOrder(orderData: { courseId: string; courseTitle: string; amount: number; paymentMethod?: string }) {
    return this.request<any>("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  // Razorpay Gateway
  async createRazorpayOrder(payload: {
    amount: number;
    courseId: string;
    courseTitle: string;
    studentName?: string;
    studentEmail?: string;
    studentPhone?: string;
  }) {
    return this.request<{
      order: { id: string; amount: number; currency: string; receipt: string };
      keyId: string;
      isDemo: boolean;
    }>("/integrations/razorpay/create-order", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async verifyRazorpayPayment(payload: {
    orderId: string;
    paymentId: string;
    signature?: string;
    courseId: string;
    courseTitle?: string;
    amount: number;
    studentName?: string;
    studentEmail?: string;
    studentPhone?: string;
    studentId?: string;
  }) {
    return this.request<{
      verified: boolean;
      isDemo: boolean;
      order: any;
      receiptNumber: string;
      message: string;
    }>("/integrations/razorpay/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  // Settings
  async getSettings() {
    return this.request<any>("/settings");
  }
}

export const api = new ApiClient();
