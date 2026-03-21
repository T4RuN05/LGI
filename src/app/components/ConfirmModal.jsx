"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="bg-white w-[400px] rounded-md shadow-lg p-6 text-center"
        >
          <h3 className="text-lg font-semibold mb-4">{title}</h3>

          <p className="text-sm text-gray-600 mb-6">{message}</p>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              disabled={loading}
              className={`px-6 py-2 border transition
                ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className={`px-6 py-2 bg-black text-white transition
                ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90"
                }`}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}