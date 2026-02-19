"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setHydrated(true);
  }, []);

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    document.cookie = `token=${data.token}; path=/`;
    setUser(data);

    // 🔥 REDIRECT HERE
    if (data.role === "admin") {
      router.replace("/admin/products");
    } else {
      router.replace("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    document.cookie = "token=; Max-Age=0; path=/";
    setUser(null);
    router.replace("/");
  };

  if (!hydrated) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
