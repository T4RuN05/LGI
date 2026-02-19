"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "@/app/components/ConfirmModal";
import toast from "react-hot-toast";
import AuthModal from "../AuthModal";

export default function ProductCard({
  product,
  isAdmin = false,
  onDelete,
  onToggleFeatured,
}) {
  if (!product) return null;

  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const imageUrl = product?.images?.[0]?.url;
  const minPrice = product?.priceRange?.min;
  const maxPrice = product?.priceRange?.max;

  const handleDelete = async () => {
    try {
      await onDelete(product._id);

      toast.success("Product deleted successfully");

      setShowConfirm(false);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const priceDisplay =
    minPrice !== maxPrice ? `$${minPrice}-${maxPrice}` : `$${minPrice}`;

  const whatsappMessage = `Hello, I'm interested in "${product.title}" (MOQ: ${product.moq} ${product.moqUnit}). Please share more details.`;

  const handleChat = async () => {
    if (!user) {
      setShowModal(true);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}/whatsapp`,
    );

    const data = await res.json();

    window.open(data.whatsappUrl, "_blank");
  };

  return (
    <div className="bg-[#F2F1EC] rounded-md shadow-md p-6 text-center">
      <Link href={`/products/${product.slug}`}>
        <div className="cursor-pointer group">
          {/* Added overflow-hidden + group for zoom effect */}
          <div className="aspect-square mb-6 bg-white flex items-center justify-center overflow-hidden">
            <img
              src={imageUrl}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>

          <p className="text-sm mb-2 text-gray-700 line-clamp-2">
            {product.title}
          </p>

          <p className="font-semibold text-lg">{priceDisplay}</p>

          <p className="text-xs text-gray-500 mb-4">
            Min. Order: {product.moq} {product.moqUnit}
          </p>
        </div>
      </Link>

      {/* ADMIN MODE */}
      {isAdmin ? (
        <div className="space-y-2 mt-4">
          <div className="flex gap-2">
            <Link
              href={`/admin/products/edit/${product.slug}`}
              className="flex-1 border py-1 text-sm hover:bg-black hover:text-white transition"
            >
              EDIT
            </Link>

            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 border py-1 text-sm hover:bg-black hover:text-white transition"
            >
              DELETE
            </button>
          </div>

          <button
            onClick={() => onToggleFeatured(product._id)}
            className="w-full border py-1 text-sm hover:bg-black hover:text-white transition"
          >
            {product.isFeatured ? "REMOVE FEATURED" : "ADD TO FEATURED"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleChat}
          className="inline-flex items-center justify-center gap-2 
                     border border-black px-6 py-1 
                     text-sm tracking-wide 
                     hover:bg-black hover:text-white transition"
        >
          <FaWhatsapp size={14} />
          CHAT NOW
        </button>
      )}

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      {showConfirm && (
        <ConfirmModal
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
