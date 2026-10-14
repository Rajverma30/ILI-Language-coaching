const getApiBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined") {
    return "/api-backend";
  }
  return "http://127.0.0.1:5000/api";
};

class AdminApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("ili_admin_token");
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("ili_admin_token", token);
      } else {
        localStorage.removeItem("ili_admin_token");
      }
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== "undefined") {
      this.token = localStorage.getItem("ili_admin_token");
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
        error: "Network error: Unable to connect to backend server.",
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

  // Courses CRUD
  async getCourses() {
    return this.request<any[]>("/courses");
  }

  async getCourseById(id: string) {
    return this.request<any>(`/courses/${id}`);
  }

  async createCourse(courseData: any) {
    return this.request<any>("/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id: string, updates: any) {
    return this.request<any>(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }

  async deleteCourse(id: string) {
    return this.request<any>(`/courses/${id}`, {
      method: "DELETE",
    });
  }

  async addSection(courseId: string, title: string) {
    return this.request<any>(`/courses/${courseId}/sections`, {
      method: "POST",
      body: JSON.stringify({ title }),
    });
  }

  async deleteSection(courseId: string, sectionId: string) {
    return this.request<any>(`/courses/${courseId}/sections/${sectionId}`, {
      method: "DELETE",
    });
  }

  async addLecture(courseId: string, sectionId: string, lectureData: any) {
    return this.request<any>(`/courses/${courseId}/sections/${sectionId}/lectures`, {
      method: "POST",
      body: JSON.stringify(lectureData),
    });
  }

  async deleteLecture(courseId: string, sectionId: string, lectureId: string) {
    return this.request<any>(`/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`, {
      method: "DELETE",
    });
  }

  // Students
  async getStudents() {
    return this.request<any[]>("/students");
  }

  // Leads
  async getLeads() {
    return this.request<any[]>("/leads");
  }

  async updateLeadStatus(id: string, status: string) {
    return this.request<any>(`/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async addLeadNote(id: string, text: string, author?: string) {
    return this.request<any>(`/leads/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ text, author }),
    });
  }

  async createLead(leadData: any) {
    return this.request<any>("/leads", {
      method: "POST",
      body: JSON.stringify(leadData),
    });
  }

  async deleteLead(id: string) {
    return this.request<any>(`/leads/${id}`, {
      method: "DELETE",
    });
  }

  async clearAllLeads() {
    return this.request<any>("/leads/clear-all", {
      method: "DELETE",
    });
  }

  // Orders
  async getOrders() {
    return this.request<any[]>("/orders");
  }

  // Settings
  async getSettings() {
    return this.request<any>("/settings");
  }

  async updateSettings(updates: any) {
    return this.request<any>("/settings", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  }
}

export const adminApi = new AdminApiClient();
