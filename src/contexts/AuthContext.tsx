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

// Store registered users (simulating a database)
const registeredUsers: User[] = [];

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
    
    // Check if email already exists
    const existingUser = registeredUsers.find(u => u.email === data.email);
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    // Store user in our "database"
    registeredUsers.push(data);
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    // Find user in registered users
    const foundUser = registeredUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser(foundUser);
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
