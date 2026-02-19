"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AuthModal({ onClose }) {

  // 🔥 Disable scroll when modal opens
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* 🔥 Blurred Background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[400px] p-8 rounded-lg text-center shadow-xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Please Sign In
        </h2>

        <p className="text-gray-500 mb-6">
          You must be logged in to chat with the seller.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="border px-4 py-2 hover:bg-black hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="border px-4 py-2 hover:bg-black hover:text-white transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}
