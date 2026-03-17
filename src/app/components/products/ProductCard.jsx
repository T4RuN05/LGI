"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "@/app/components/ConfirmModal";
import toast from "react-hot-toast";
import { useLocale } from "@/context/LocaleContext";
import { convertPrice, formatCurrency } from "@/utils/currency";
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
  const { currency, rates, t } = useLocale();

  const convertedMin = convertPrice(minPrice, currency, rates);
  const convertedMax = convertPrice(maxPrice, currency, rates);

  const priceDisplay =
    minPrice !== maxPrice
      ? `${formatCurrency(convertedMin, currency)} - ${formatCurrency(convertedMax, currency)}`
      : formatCurrency(convertedMin, currency);

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
      className={`bg-[#F2F1EC] rounded-lg shadow-lg text-center flex flex-col
  ${isCompact ? "p-4 md:p-6" : "p-4 md:p-6 h-full"}`}
    >
      <Link href={`/products/${product.slug}`} className="flex-grow">
        <div className="cursor-pointer group h-full flex flex-col">
          <div
            className={`bg-white flex items-center justify-center overflow-hidden
  ${isCompact ? "h-32 mb-2" : "aspect-square mb-4 md:mb-6"}`}
          >
            <img
              src={imageUrl}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
          </div>

          <p
            className={`text-gray-700 line-clamp-2
  ${isCompact ? "text-xs mb-1 min-h-[28px]" : "text-xs md:text-sm mb-1 md:mb-2 min-h-[32px] md:min-h-[40px]"}`}
          >
            {product.title}
          </p>

          <p
            className={`${isCompact ? "text-sm mb-1" : "text-sm md:text-lg"} font-semibold`}
          >
            {priceDisplay}
          </p>

          {!isCompact && (
            <p className="text-[10px] md:text-xs text-gray-500 mb-2 md:mb-4">
              {t("MinOrder")}: {product.moq} {product.moqUnit}
            </p>
          )}
        </div>
      </Link>

      {isAdmin ? (
        <div className="space-y-2 mt-auto">
          <div className="flex gap-2">
            <Link
              href={`/admin/products/edit/${product.slug}`}
              className="flex-1 border py-2 text-base hover:bg-black hover:text-white transition cursor-pointer"
            >
              EDIT
            </Link>

            <button
              onClick={() => setShowConfirm(true)}
              style={{ cursor: "pointer" }}
              className="flex-1 border py-2 text-base hover:bg-black hover:text-white transition"
            >
              DELETE
            </button>
          </div>

          <button
            disabled={updatingFeatured}
            style={{ cursor: updatingFeatured ? "not-allowed" : "pointer" }}
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
              ${updatingFeatured ? "opacity-50" : "hover:bg-black hover:text-white"}`}
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
            className="
              w-full md:w-auto 
              inline-flex items-center justify-center gap-2 
              border border-black 
              px-3 md:px-6 py-1.5 md:py-2 
              text-xs md:text-base 
              transition 
            hover:bg-black hover:text-white
              "
          >
            <FaWhatsapp size={14} />
            {t("chatNow")}
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
