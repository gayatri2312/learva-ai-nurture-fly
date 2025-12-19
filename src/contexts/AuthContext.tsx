import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  major: string;
  collegeYear: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  major: string;
  collegeYear: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signup = async (data: SignupData) => {
    if (!validateEmail(data.email)) {
      return { success: false, message: "Invalid email" };
    }
    if (data.password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }
    if (user && user.email === data.email) {
      return { success: false, message: "Email already exists" };
    }

    // Store user
    setUser(data);
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    if (user && user.email === email && user.password === password) {
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
