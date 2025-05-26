/*"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/profile";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const persistAuthData = (userData: User, authToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
  };

  const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const refreshUser = async (): Promise<boolean> => {
    try {
      const storedToken = localStorage.getItem("token");
      console.log("[🔁 RefreshUser] Retrieved token:", storedToken);

      if (!storedToken) {
        console.warn("[⚠️ RefreshUser] No token found in localStorage");
        clearAuthData();
        return false;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("[✅ RefreshUser] User data:", userData);
        persistAuthData(userData, storedToken);
        return true;
      } else {
        console.warn("[⚠️ RefreshUser] Failed to fetch user data, status:", response.status);
        clearAuthData();
        return false;
      }
    } catch (error) {
      console.error("[❌ RefreshUser] Error:", error);
      clearAuthData();
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      console.log("[🔐 InitAuth] Token from localStorage:", storedToken);
      console.log("[🔐 InitAuth] User from localStorage:", storedUser);

      if (storedToken && storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);

          const isRefreshed = await refreshUser();
          if (!isRefreshed) {
            console.warn("[⚠️ InitAuth] Token validation failed");
            clearAuthData();
          }
        } catch (err) {
          console.error("[❌ InitAuth] Failed to parse stored user", err);
          clearAuthData();
        }
      } else {
        console.warn("[⚠️ InitAuth] No valid auth data found");
        clearAuthData();
      }

      setIsLoading(false);
    };

    initAuth();
    const interval = setInterval(refreshUser, 5 * 60 * 1000); // Refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // ✅ Ensure token is extracted from data.user
      const authToken = data.user?.token;
      if (!authToken) {
        throw new Error("Token not provided in login response");
      }

      persistAuthData(data.user, authToken);
      router.push("/");
    } catch (error) {
      console.error("[❌ Login] Error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("[🚪 Logout] Clearing auth data");
    clearAuthData();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};*/

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/profile";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<boolean>;
  setAuthData?: (user: User, token: string) => void; // Optional override
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ✅ Persist to state and localStorage
  const persistAuthData = (userData: User, authToken: string) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
    setUser(userData);
    setToken(authToken);
  };

  // ❌ Clear on logout or failure
  const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  // 🔁 Fetch latest user info from backend
  const refreshUser = async (): Promise<boolean> => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      clearAuthData();
      return false;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (result?.success && result?.data) {
          persistAuthData(result.data, storedToken);
          return true;
        }
      }

      clearAuthData();
      return false;
    } catch (error) {
      console.error("[❌ RefreshUser Error]", error);
      clearAuthData();
      return false;
    }
  };

  // 🔐 On app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setToken(storedToken);

          const valid = await refreshUser();
          if (!valid) {
            clearAuthData();
          }
        } catch (error) {
          console.error("[❌ Auth Init Parse Error]", error);
          clearAuthData();
        }
      } else {
        clearAuthData();
      }

      setIsLoading(false);
    };

    initializeAuth();

    const interval = setInterval(refreshUser, 5 * 60 * 1000); // every 5 min
    return () => clearInterval(interval);
  }, []);

  // 🟢 Login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      const authToken = data?.user?.token;

      if (!authToken) throw new Error("No token provided in login response");

      persistAuthData(data.user, authToken);
      router.push("/");
    } catch (error) {
      console.error("[❌ Login Error]", error);
      throw error;
    }
  };

  // 🚪 Logout
  const logout = () => {
    clearAuthData();
    router.push("/login");
  };

  // Manual override (optional)
  const setAuthData = (userData: User, authToken: string) => {
    persistAuthData(userData, authToken);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoading, refreshUser, setAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Safe custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

