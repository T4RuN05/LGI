"use client";

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#F2F1EC] w-[400px] p-8 rounded-xl shadow-xl">

        <h2 className="text-lg font-semibold mb-4">
          {title}
        </h2>

        <p className="text-sm text-gray-700 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 border border-black 
                       hover:bg-black hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-black text-white 
                       hover:opacity-90 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
