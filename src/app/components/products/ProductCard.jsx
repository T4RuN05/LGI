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
  variant = "default",
}) {
  if (!product) return null;

  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const imageUrl = product?.images?.[0]?.url;
  const minPrice = product?.priceRange?.min;
  const maxPrice = product?.priceRange?.max;
  const [updatingFeatured, setUpdatingFeatured] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isCompact = variant === "compact";

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await onDelete(product._id);

      toast.success("Product deleted successfully");
      setShowConfirm(false);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const priceDisplay =
    minPrice !== maxPrice ? `$${minPrice}-${maxPrice}` : `$${minPrice}`;

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
    <div
      className={`bg-[#F2F1EC] rounded-md shadow-md text-center flex flex-col
  ${isCompact ? "p-4" : "p-6 h-full"}`}
    >
      {/* CONTENT WRAPPER (ADDED flex-grow) */}
      <Link href={`/products/${product.slug}`} className="flex-grow">
        <div className="cursor-pointer group h-full flex flex-col">
          <div
            className={`bg-white flex items-center justify-center overflow-hidden
  ${isCompact ? "h-32 mb-3" : "aspect-square mb-6"}`}
          >
            <img
              src={imageUrl}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>

          <p
            className={`text-gray-700 line-clamp-2
  ${isCompact ? "text-xs mb-1 min-h-[30px]" : "text-sm mb-2 min-h-[40px]"}`}
          >
            {product.title}
          </p>

          <p className={`${isCompact ? "text-base" : "text-lg"} font-semibold`}>
            {priceDisplay}
          </p>

          {!isCompact && (
            <p className="text-xs text-gray-500 mb-4">
              Min. Order: {product.moq} {product.moqUnit}
            </p>
          )}
        </div>
      </Link>

      {/* BUTTON SECTION (ADDED mt-auto) */}
      {isAdmin ? (
        <div className="space-y-2 mt-auto">
          <div className="flex gap-2">
            <Link
              href={`/admin/products/edit/${product.slug}`}
              className="flex-1 border py-2 text-base hover:bg-black hover:text-white transition"
            >
              EDIT
            </Link>

            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 border py-2 text-base hover:bg-black hover:text-white transition"
            >
              DELETE
            </button>
          </div>

          <button
            disabled={updatingFeatured}
            onClick={async () => {
              try {
                setUpdatingFeatured(true);

                await onToggleFeatured(product._id);

                toast.success(
                  product.isFeatured
                    ? "Product removed from featured"
                    : "Product added to featured",
                );
              } catch (err) {
                toast.error("Failed to update featured status");
              } finally {
                setUpdatingFeatured(false);
              }
            }}
            className={`w-full border py-2 text-base transition
              ${
                updatingFeatured
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-black hover:text-white"
              }`}
          >
            {updatingFeatured
              ? "Updating..."
              : product.isFeatured
                ? "REMOVE FEATURED"
                : "ADD TO FEATURED"}
          </button>
        </div>
      ) : (
        <div className="mt-auto">
          <button
            onClick={handleChat}
            className="inline-flex items-center justify-center gap-2 
           border border-black px-8 py-2 
           text-base tracking-wide 
           hover:bg-black hover:text-white transition cursor-pointer"
          >
            <FaWhatsapp size={14} />
            CHAT NOW
          </button>
        </div>
      )}

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      {showConfirm && (
        <ConfirmModal
          title="Delete Product"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => !deleting && setShowConfirm(false)}
          loading={deleting}
        />
      )}
    </div>
  );
}
