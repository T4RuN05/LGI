"use client";

import { useRef, useState, useEffect } from "react";
import { FaWhatsapp, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FiUpload, FiX } from "react-icons/fi";
import AuthModal from "@/app/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "./ProductCard";
import { useLocale } from "@/context/LocaleContext";
import { convertPrice, formatCurrency } from "@/utils/currency";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails({ product }) {
  const attributesRef = useRef(null);
  const descriptionRef = useRef(null);
  const reviewsRef = useRef(null);
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const thumbnailsRef = useRef(null);
  const faqRef = useRef(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [showGallery, setShowGallery] = useState(false);
  const { currency, rates, t } = useLocale();
  const minPrice = product?.priceRange?.min;
  const maxPrice = product?.priceRange?.max;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [authMessage, setAuthMessage] = useState("");
  const [uploadingImages, setUploadingImages] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [localImages, setLocalImages] = useState([]); // File previews

  const activeImage = product?.images?.[currentIndex]?.url;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [reviewModal, setReviewModal] = useState({
    open: false,
    images: [],
    index: 0,
  });

  const handleReviewPrev = () => {
    setReviewModal((prev) => ({
      ...prev,
      index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1,
    }));
  };

  const handleReviewNext = () => {
    setReviewModal((prev) => ({
      ...prev,
      index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1,
    }));
  };

  const handleSubmitReview = async () => {
    if (!user) {
      setAuthMessage("You must be signed in to submit a review");
      setShowAuthModal(true);
      return;
    }

    const imageUrls = await uploadImages();
    setImages(imageUrls);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user?.name,
            productId: product._id,
            rating,
            comment,
            images: imageUrls,
          }),
          credentials: "include",
        },
      );

      const data = await res.json();

      if (res.ok) {
        setReviews([data, ...reviews]);
        setComment("");
        setImages([]);
        setLocalImages([]);
        setUploadedImages([]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImages = async () => {
    if (!localImages.length) return [];

    const formData = new FormData();
    localImages.forEach((file) => formData.append("images", file));

    try {
      setUploadingImages(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/upload`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      // STORE uploaded images for cleanup
      setUploadedImages((prev) => [...prev, ...data]);

      return data;
    } catch (err) {
      console.error("Upload error:", err);
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  const uploadedImagesRef = useRef([]);

  useEffect(() => {
    uploadedImagesRef.current = uploadedImages;
  }, [uploadedImages]);

  useEffect(() => {
    return () => {
      if (uploadedImagesRef.current.length === 0) return;

      const blob = new Blob(
        [
          JSON.stringify({
            public_ids: uploadedImagesRef.current.map((img) => img.public_id),
          }),
        ],
        { type: "application/json" },
      );

      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/cleanup-images`,
        blob,
      );
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;

    if (diff > 50) handleNextImage(); // swipe left
    if (diff < -50) handlePrevImage(); // swipe right
  };

  const scrollToSection = (ref) => {
    if (!ref.current) return;

    const tabHeight = 95;
    const y =
      ref.current.getBoundingClientRect().top + window.pageYOffset - tabHeight;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const scrollThumbs = (direction) => {
    if (!thumbnailsRef.current) return;

    thumbnailsRef.current.scrollBy({
      top: direction === "up" ? -120 : 120,
      behavior: "smooth",
    });
  };

  const handlePrevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const convertedMin = convertPrice(minPrice, currency, rates);
  const convertedMax = convertPrice(maxPrice, currency, rates);

  const priceDisplay =
    minPrice !== maxPrice
      ? `${formatCurrency(convertedMin, currency)} - ${formatCurrency(convertedMax, currency)}`
      : formatCurrency(convertedMin, currency);
  const handleChat = async () => {
    if (!user) {
      setAuthMessage("You must be signed in to chat with seller");
      setShowAuthModal(true);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}/whatsapp`,
      );

      const data = await res.json();

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
    } catch (error) {
      console.error("WhatsApp redirect failed:", error);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${product._id}`,
      );
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
  }, [product._id]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/slug/${product.slug}/related`,
        );

        const data = await res.json();

        if (Array.isArray(data)) {
          setRelatedProducts(data);
        } else {
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };

    fetchRelated();
  }, [product._id]);

  useEffect(() => {
    const calculateCards = () => {
      const pageHeight = document.body.scrollHeight;
      const approxCardHeight = 360; // adjust if needed

      const count = Math.floor(pageHeight / approxCardHeight);

      setCardsToShow(count > 2 ? count : 4);
    };

    calculateCards();
    window.addEventListener("resize", calculateCards);

    return () => window.removeEventListener("resize", calculateCards);
  }, []);

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-3">
      <div className="max-w-[1850px] mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* LEFT CONTENT */}
        <div className="flex-1">
          {/* TOP PRODUCT SECTION */}
          <div className="bg-[#F2F1EC] p-4 md:p-4 md:p-8 shadow-md rounded-md flex flex-col md:flex-row gap-6 md:gap-10">
            {/* IMAGES */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              {/* THUMBNAILS */}
              <div className="hidden md:flex flex-col items-center">
                {/* UP ARROW */}
                <button
                  onClick={() => scrollThumbs("up")}
                  className="mb-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
                >
                  <FaChevronUp size={12} />
                </button>

                {/* THUMBNAIL LIST */}
                <div
                  ref={thumbnailsRef}
                  className="flex md:flex-col flex-row gap-2 md:gap-3 max-h-[360px] md:overflow-hidden overflow-x-auto"
                >
                  {product.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      onMouseEnter={() => setCurrentIndex(index)}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-20 h-20 object-contain border rounded-md cursor-pointer transition hover:shadow-md ${
                        activeImage === img.url
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* DOWN ARROW */}
                <button
                  onClick={() => scrollThumbs("down")}
                  className="mt-2 p-2 bg-white rounded-full shadow hover:scale-105 transition"
                >
                  <FaChevronDown size={12} />
                </button>
              </div>

              {/* MAIN IMAGE */}
              <div className="relative w-full md:w-[450px] md:min-w-[450px] aspect-square bg-white rounded-lg shadow-inner overflow-hidden group">
                {/* SLIDING STRIP */}
                <div
                  className="flex h-full w-full transition-transform duration-300 ease-in-out pointer-events-none"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {product.images?.map((img, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex-shrink-0 flex items-center justify-center pointer-events-auto"
                    >
                      <img
                        src={img.url}
                        onClick={() => setShowGallery(true)}
                        className="max-w-full max-h-full object-contain cursor-zoom-in"
                      />
                    </div>
                  ))}
                </div>

                {/* LEFT ARROW */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10
      bg-white/90 hover:bg-white
      p-3 rounded-full shadow-md
      opacity-0 group-hover:opacity-100
      transition duration-300"
                >
                  <FaChevronUp className="-rotate-90" size={14} />
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10
      bg-white/90 hover:bg-white
      p-3 rounded-full shadow-md
      opacity-0 group-hover:opacity-100
      transition duration-300"
                >
                  <FaChevronDown className="rotate-270" size={14} />
                </button>

                {/* DOTS */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-10">
                  {product.images?.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === index
                          ? "bg-black w-4"
                          : "bg-gray-400 w-2"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-left">
                {product.title}
              </h1>

              <p className="text-sm text-gray-600 mb-2 text-left">
                {t("minOrder")}: {product.moq} {product.moqUnit}
              </p>

              <p className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-left">
                {priceDisplay}
              </p>

              <button
                onClick={handleChat}
                className="w-full md:w-auto inline-flex justify-center items-center gap-2 border border-black px-6 py-2 hover:bg-black hover:text-white transition"
              >
                <FaWhatsapp />
                {t("chatNow")}
              </button>
            </div>
          </div>

          {/* MOBILE RECOMMENDATIONS TAB HEADER */}
          <div className="mt-5 md:hidden bg-[#F2F1EC] shadow-md rounded-md py-3">
            <h3 className="text-center text-base font-semibold tracking-wide">
              {t("otherRecommendation")}
            </h3>
          </div>

          {/* MOBILE RECOMMENDATIONS CONTENT */}
          <div className="md:hidden mt-4">
            <div className="flex gap-4 overflow-x-auto px-2 snap-x snap-mandatory scroll-smooth no-scrollbar">
              {relatedProducts.map((item) => (
                <div key={item._id} className="min-w-[220px] snap-start">
                  <ProductCard product={item} variant="compact" />
                </div>
              ))}
            </div>
          </div>

          {/* TAB STRIP */}
          <div className="bg-[#F2F1EC] mt-8 shadow-md backdrop-blur-md rounded-md sticky top-18 z-20">
            <div className="flex justify-center gap-6 md:gap-16 py-4 text-base md:text-lg tracking-wide overflow-x-auto text-center w-full">
              <button
                className="cursor-pointer"
                onClick={() => scrollToSection(attributesRef)}
              >
                {t("attributes")}
              </button>
              <button
                className="cursor-pointer"
                onClick={() => scrollToSection(descriptionRef)}
              >
                {t("description")}
              </button>
              <button
                className="cursor-pointer"
                onClick={() => scrollToSection(reviewsRef)}
              >
                {t("reviews")}
              </button>
              <button
                className="cursor-pointer"
                onClick={() => scrollToSection(faqRef)}
              >
                {t("faq")}
              </button>
            </div>
          </div>

          {/* ===== ATTRIBUTES SECTION ===== */}
          <div
            ref={attributesRef}
            className="bg-[#F2F1EC] mt-6 shadow-md rounded-md p-4 md:p-8"
          >
            <div
              className="product-table overflow-x-auto
             [&_table]:w-full
             [&_table]:border-collapse
             [&_td]:p-3
             [&_td]:border
             [&_th]:p-3
             [&_th]:border
             [&_h2]:mt-8
             [&_h3]:mt-6
             [&_table]:mt-4
             [&_ul]:mt-4
             [&_li]:mb-2"
              dangerouslySetInnerHTML={{ __html: product.attributes }}
            />
          </div>
          {/* DESCRIPTION */}
          <div
            ref={descriptionRef}
            className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-4 md:p-8"
          >
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.description || "<p>No description added.</p>",
              }}
            />
          </div>
          {/* FAQ */}
          <div
            ref={faqRef}
            className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-4 md:p-8"
          >
            <h2 className="text-lg font-semibold mb-4">FAQ</h2>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.faq || "<p>No FAQs added yet.</p>",
              }}
            />
          </div>
          {/* REVIEWS */}
          <div
            ref={reviewsRef}
            className="bg-[#F2F1EC] mt-8 shadow-md rounded-md p-4 md:p-8"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-6">
              Reviews ({reviews.length})
            </h2>

            {/* ADD REVIEW */}
            <div className="mb-10 border-b pb-8">
              {/* Stars */}
              <div className="flex items-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-2xl transition transform hover:scale-110 ${
                      star <= rating ? "text-black" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full border border-gray-300 focus:border-black outline-none rounded-md p-3 text-sm resize-none mb-3 bg-white"
                rows={3}
              />

              {/* UPLOAD BOX */}
              <div className="mb-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files).slice(
                      0,
                      5 - localImages.length,
                    );
                    setLocalImages((prev) => [...prev, ...files]);
                  }}
                  className="hidden"
                  id="reviewImageUpload"
                />

                <label
                  htmlFor="reviewImageUpload"
                  className={`flex flex-col items-center justify-center 
                  border-2 border-dashed rounded-lg p-5 cursor-pointer transition bg-white
                  shadow-sm hover:shadow-md
                  ${
                    localImages.length >= 5
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:border-black border-gray-300"
                  }`}
                >
                  <FiUpload size={20} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    Upload Images{" "}
                    <span className="text-xs text-gray-400">(Max 5)</span>
                  </p>
                </label>
              </div>

              {localImages.length > 0 && (
                <div className="flex gap-3 mt-4 mb-4 flex-wrap">
                  {localImages.map((file, i) => (
                    <div key={i} className="relative">
                      {/* IMAGE */}
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-20 h-20 object-cover rounded-md border"
                      />

                      {/* ❌ DELETE BUTTON */}
                      <button
                        disabled={deletingIndex === i}
                        onClick={async () => {
                          const img = images[i] || null;

                          // If not uploaded → just remove locally
                          if (!img || !img.public_id) {
                            setLocalImages((prev) =>
                              prev.filter((_, index) => index !== i),
                            );
                            return;
                          }
                          setDeletingIndex(i); // START LOADING

                          try {
                            await fetch(
                              `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/delete-image`,
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                  public_id: img.public_id,
                                }),
                              },
                            );

                            setLocalImages(
                              localImages.filter((_, index) => index !== i),
                            );
                            setImages(images.filter((_, index) => index !== i));
                          } catch (err) {
                            console.error("Delete failed", err);
                          } finally {
                            setDeletingIndex(null);
                          }
                        }}
                        className="absolute -top-2 -right-2 
                      bg-black text-white 
                        w-5 h-5 rounded-full 
                        flex items-center justify-center 
                        text-xs transition
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:scale-110"
                      >
                        {deletingIndex === i ? "…" : <FiX size={10} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Button */}
              <button
                onClick={handleSubmitReview}
                disabled={uploadingImages}
                className="bg-black text-white px-6 py-2 rounded-md hover:opacity-90 transition disabled:opacity-50 shadow-sm hover:shadow-md"
              >
                {uploadingImages ? "Uploading..." : "Submit Review"}
              </button>
            </div>

            {/* REVIEW LIST */}
            <div className="space-y-5">
              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews yet.</p>
              ) : (
                reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-sm tracking-wide">
                        {rev.name}
                      </p>
                      <span className="text-xs text-gray-400">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="text-sm mb-3 tracking-wide">
                      {"★".repeat(rev.rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - rev.rating)}
                      </span>
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-gray-700 leading-relaxed tracking-wide">
                      {rev.comment}
                    </p>

                    {/* EVIEW IMAGES */}
                    {rev.images?.length > 0 && (
                      <div className="flex gap-3 mt-4 flex-wrap">
                        {rev.images.map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            onClick={() =>
                              setReviewModal({
                                open: true,
                                images: rev.images,
                                index: i,
                              })
                            }
                            className="w-16 h-16 object-cover rounded-md border shadow-sm cursor-pointer hover:scale-110 transition"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="hidden md:block w-[320px]">
          <div className="bg-[#F2F1EC] shadow-md rounded-md p-4 mb-6 sticky top-18 z-10">
            <h3 className="text-center font-semibold tracking-widest text-sm">
              {t("otherRecommendation")}
            </h3>
          </div>

          <div className="space-y-4">
            {Array.isArray(relatedProducts) &&
              relatedProducts
                .slice(0, cardsToShow)
                .map((item) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    variant="compact"
                  />
                ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Dark Overlay */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowGallery(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-[90%] max-w-[1200px] h-[85vh] bg-[#F2F1EC] rounded-lg p-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowGallery(false)}
                className="absolute top-4 right-4 text-black text-2xl z-10"
              >
                ✕
              </button>

              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow z-10"
              >
                <FaChevronUp className="-rotate-90" size={18} />
              </button>

              {/* SLIDING STRIP WRAPPER — this is the key: full size, overflow hidden */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <div
                  className="flex h-full w-full transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {product.images?.map((img, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex-shrink-0 flex items-center justify-center pb-24 pt-12"
                    >
                      <img
                        src={img.url}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow z-10"
              >
                <FaChevronDown className="rotate-270" size={18} />
              </button>

              {/* Bottom Thumbnails */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-3 justify-center bg-white/80 backdrop-blur-md px-4 py-2 rounded-md overflow-x-auto z-10">
                {product.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-16 h-16 flex-shrink-0 object-contain cursor-pointer border rounded-md ${
                      currentIndex === index
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          message={authMessage}
        />
      )}
      {reviewModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() =>
              setReviewModal({ open: false, images: [], index: 0 })
            }
          />

          {/* Modal */}
          <div className="relative w-[90%] max-w-[900px] h-[80vh] bg-[#F2F1EC] rounded-lg flex items-center justify-center p-6">
            {/* Close */}
            <button
              onClick={() =>
                setReviewModal({ open: false, images: [], index: 0 })
              }
              className="absolute top-4 right-4 text-black text-2xl"
            >
              ✕
            </button>

            {/* Left */}
            {reviewModal.images.length > 1 && (
              <button
                onClick={handleReviewPrev}
                className="absolute left-4 bg-white/90 hover:bg-white p-4 rounded-full shadow"
              >
                <FaChevronUp className="-rotate-90" size={18} />
              </button>
            )}

            {/* Image */}
            <img
              src={reviewModal.images[reviewModal.index]?.url}
              className="max-h-full max-w-full object-contain"
            />

            {/* Right */}
            {reviewModal.images.length > 1 && (
              <button
                onClick={handleReviewNext}
                className="absolute right-4 bg-white/90 hover:bg-white p-4 rounded-full shadow"
              >
                <FaChevronDown className="rotate-270" size={18} />
              </button>
            )}

            {/* Thumbnails */}
            {reviewModal.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-md">
                {reviewModal.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    onClick={() =>
                      setReviewModal((prev) => ({
                        ...prev,
                        index: idx,
                      }))
                    }
                    className={`w-14 h-14 object-cover cursor-pointer border rounded-md ${
                      reviewModal.index === idx
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
