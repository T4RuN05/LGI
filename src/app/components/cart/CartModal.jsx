"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/LocaleContext";
import { convertPrice, formatCurrency } from "@/utils/currency";
import AuthModal from "@/app/components/AuthModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartModal() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
  } = useCart();

  const { user } = useAuth();
  const { currency, rates, t } = useLocale();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [guestBannerDismissed, setGuestBannerDismissed] = useState(false);
  const backdropRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }
    return () => document.body.classList.remove("cart-open");
  }, [isCartOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isCartOpen, closeCart]);

  // Calculate totals
  const totals = items.reduce(
    (acc, item) => {
      const min = (item.product.priceRange?.min || 0) * item.quantity;
      const max = (item.product.priceRange?.max || 0) * item.quantity;
      return { min: acc.min + min, max: acc.max + max };
    },
    { min: 0, max: 0 }
  );

  const convertedMin = convertPrice(totals.min, currency, rates);
  const convertedMax = convertPrice(totals.max, currency, rates);

  const totalDisplay =
    totals.min !== totals.max
      ? `${formatCurrency(convertedMin, currency)} – ${formatCurrency(convertedMax, currency)}`
      : formatCurrency(convertedMin, currency);

  const handleWhatsApp = async () => {
    if (items.length === 0) return;
    setWhatsappLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/whatsapp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.product._id,
              quantity: item.quantity,
            })),
          }),
        }
      );
      const data = await res.json();
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
    } catch {
      toast.error("Failed to generate WhatsApp link");
    } finally {
      setWhatsappLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              ref={backdropRef}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeCart}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[95] w-full sm:w-[440px] bg-[#F2F1EC] shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              {/* ─── HEADER ─── */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#e0dbd4]">
                <div className="flex items-center gap-3">
                  <FiShoppingBag size={20} className="text-[#2D2319]" />
                  <h2 className="text-lg font-semibold text-[#2D2319] tracking-wide">
                    {t("yourCart")}
                  </h2>
                  {cartCount > 0 && (
                    <span className="bg-[#2D2319] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-[#ebe6e0] transition nav-icon-hover"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* ─── GUEST BANNER ─── */}
              {!user && items.length > 0 && !guestBannerDismissed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-b border-[#e0dbd4] overflow-hidden"
                >
                  <div className="px-5 py-3 bg-[#f9f5f0] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EBE2DB] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6b5e52"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#4a3f33] leading-relaxed">
                        {t("cartGuestMessage")}
                      </p>
                      <button
                        onClick={() => {
                          setShowAuthModal(true);
                        }}
                        className="mt-1.5 text-xs font-medium text-[#2D2319] underline underline-offset-2 hover:text-[#5a4d3f] transition"
                      >
                        Sign In
                      </button>
                    </div>
                    <button
                      onClick={() => setGuestBannerDismissed(true)}
                      className="p-1 rounded hover:bg-[#ebe6e0] transition flex-shrink-0"
                    >
                      <FiX size={14} className="text-[#8a7d71]" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── ITEMS LIST ─── */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#EBE2DB] flex items-center justify-center mb-4">
                      <FiShoppingBag size={32} className="text-[#8a7d71]" />
                    </div>
                    <p className="text-base font-medium text-[#2D2319] mb-1">
                      {t("cartEmpty")}
                    </p>
                    <p className="text-sm text-[#8a7d71] mb-5">
                      {t("browseProducts")}
                    </p>
                    <Link
                      href="/products"
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 bg-[#2D2319] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d3428] transition shadow-sm hover:shadow-md"
                    >
                      {t("products")}
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[#e6e1da]">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => {
                        const itemMin = convertPrice(
                          (item.product.priceRange?.min || 0) * item.quantity,
                          currency,
                          rates
                        );
                        const itemMax = convertPrice(
                          (item.product.priceRange?.max || 0) * item.quantity,
                          currency,
                          rates
                        );
                        const itemPriceDisplay =
                          item.product.priceRange?.min !==
                          item.product.priceRange?.max
                            ? `${formatCurrency(itemMin, currency)} – ${formatCurrency(itemMax, currency)}`
                            : formatCurrency(itemMin, currency);

                        return (
                          <motion.div
                            key={item.product._id}
                            layout
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="px-5 py-4 flex gap-4"
                          >
                            {/* Thumbnail */}
                            <Link
                              href={`/products/${item.product.slug}`}
                              onClick={closeCart}
                              className="w-20 h-20 bg-white rounded-lg border border-[#e0dbd4] flex items-center justify-center flex-shrink-0 overflow-hidden group"
                            >
                              <img
                                src={item.product.images?.[0]?.url}
                                alt={item.product.title}
                                className="max-w-full max-h-full object-contain transition-transform duration-200 group-hover:scale-110"
                              />
                            </Link>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/products/${item.product.slug}`}
                                onClick={closeCart}
                                className="text-sm font-medium text-[#2D2319] line-clamp-2 hover:underline leading-snug"
                              >
                                {item.product.title}
                              </Link>

                              <p className="text-sm font-semibold text-[#2D2319] mt-1.5">
                                {itemPriceDisplay}
                              </p>

                              {/* Quantity controls */}
                              <div className="flex items-center justify-between mt-2.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex items-center gap-0 border border-[#d8d3cc] rounded-lg overflow-hidden">
                                  <button
                                    onClick={() => {
                                      const minQuantity = item.product.moq || 1;
                                      if (item.quantity <= minQuantity) {
                                        toast.error(`Minimum Order Quantity is ${minQuantity}`, { id: `moq-${item.product._id}` });
                                        return;
                                      }
                                      updateQuantity(
                                        item.product._id,
                                        item.quantity - 1
                                      );
                                    }}
                                    className={`w-8 h-8 flex items-center justify-center transition ${
                                      item.quantity <= (item.product.moq || 1)
                                        ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                                        : "hover:bg-[#EBE2DB] text-[#6b5e52]"
                                    }`}
                                  >
                                    <FiMinus size={14} />
                                  </button>
                                  <input
                                    type="number"
                                    value={item.quantity === 0 ? "" : item.quantity}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (val === "") {
                                        updateQuantity(item.product._id, 0);
                                        return;
                                      }
                                      const parsed = parseInt(val, 10);
                                      if (!isNaN(parsed)) {
                                        updateQuantity(item.product._id, Math.abs(parsed));
                                      }
                                    }}
                                    onBlur={() => {
                                      const minQuantity = item.product.moq || 1;
                                      if (item.quantity < minQuantity) {
                                        toast.error(`Minimum Order Quantity is ${minQuantity}`, { id: `moq-blur-${item.product._id}` });
                                        updateQuantity(item.product._id, minQuantity);
                                      }
                                    }}
                                    className="w-12 h-8 text-center text-sm font-medium border-x border-[#d8d3cc] bg-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                  />
                                    <button
                                      onClick={() =>
                                        updateQuantity(
                                          item.product._id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="w-8 h-8 flex items-center justify-center hover:bg-[#EBE2DB] transition text-[#6b5e52]"
                                    >
                                      <FiPlus size={14} />
                                    </button>
                                  </div>
                                  <span className="text-xs font-medium text-[#8a7d71] lowercase">
                                    {item.product.moqUnit || "pieces"}
                                  </span>
                                </div>

                                {/* Remove */}
                                <button
                                  onClick={() =>
                                    removeFromCart(item.product._id)
                                  }
                                  className="p-2 rounded-full text-[#b0a89e] hover:text-red-500 hover:bg-red-50 transition"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* ─── FOOTER ─── */}
              {items.length > 0 && (
                <div className="border-t border-[#e0dbd4] px-5 py-4 bg-[#f9f7f4]">
                  {/* Total */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#6b5e52]">
                      {t("estimatedTotal")}
                    </span>
                    <span className="text-lg font-semibold text-[#2D2319]">
                      {totalDisplay}
                    </span>
                  </div>

                  {/* WhatsApp CTA */}
                  <button
                    onClick={handleWhatsApp}
                    disabled={whatsappLoading}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1fb855] text-white font-medium py-3 rounded-lg transition shadow-sm hover:shadow-md disabled:opacity-60 mb-2.5"
                  >
                    <FaWhatsapp size={18} />
                    {whatsappLoading
                      ? "Generating..."
                      : t("chatOnWhatsApp")}
                  </button>

                  {/* Clear cart */}
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-xs text-[#8a7d71] hover:text-red-500 py-1.5 transition"
                  >
                    {t("clearCart")}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          message="Sign in to save your cart across devices"
        />
      )}
    </>
  );
}
