"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const { user, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;

    if (!user || user.role !== "admin") {
      router.replace("/auth");
    }
  }, [user, hydrated]);

  if (!hydrated || !user || user.role !== "admin") {
    return null; // prevents flicker
  }

  return children;
}