"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "email" | "google";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("sentinel_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      provider: "email",
    };
    
    setUser(mockUser);
    localStorage.setItem("sentinel_user", JSON.stringify(mockUser));
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: "2",
      email: "user@example.com",
      name: "Google User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=google",
      provider: "google",
    };
    
    setUser(mockUser);
    localStorage.setItem("sentinel_user", JSON.stringify(mockUser));
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("sentinel_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
