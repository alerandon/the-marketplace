import { ApiError } from "@/lib/api-types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ApiService {
  private static getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  static setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  }

  static removeAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    console.log("Response URL:", response.url);

    if (!response.ok) {
      let errorData: ApiError;
      try {
        errorData = await response.json();
      } catch {
        errorData = {
          message: `Error ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          error: response.statusText,
        };
      }

      // Log del error para debugging
      console.error("API Error:", {
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      throw errorData;
    }

    const jsonData = await response.json();
    console.log("JSON parseado:", jsonData);
    return jsonData;
  }

  static async get<T>(endpoint: string): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    return this.handleResponse<T>(response);
  }

  static async post<T>(endpoint: string, data: unknown): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  static async put<T>(endpoint: string, data: unknown): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  static async delete<T>(endpoint: string): Promise<T> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    return this.handleResponse<T>(response);
  }
}
