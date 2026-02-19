"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#F2F1EC",
          color: "#000",
          border: "1px solid #000",
          padding: "14px 18px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#000",
            secondary: "#F2F1EC",
          },
        },
        error: {
          iconTheme: {
            primary: "#000",
            secondary: "#F2F1EC",
          },
        },
      }}
    />
  );
}
