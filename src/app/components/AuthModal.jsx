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

        <h2 className="text-xl font-semibold mb-4">Please Sign In</h2>

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

        <div className="mt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
            className="w-full flex items-center justify-center gap-3 border py-2 rounded-md hover:bg-black hover:text-white transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-4 h-4"
            />
            Continue with Google
          </a>
        </div>
      </div>
    </div>
  );
}
