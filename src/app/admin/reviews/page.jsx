"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Star, Trash2, Mail, Search, X, ChevronDown, ChevronUp, ExternalLink, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [expandedReview, setExpandedReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reviews`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    setDeleteModalId(null);
    setDeletingId(reviewId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        toast.success("Review deleted");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      } else {
        toast.error("Failed to delete review");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  const handleReply = async (reviewId) => {
    if (!replyText.trim()) {
      toast.error("Please write a reply");
      return;
    }

    setSendingReply(reviewId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${reviewId}/mail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ reply: replyText }),
        }
      );

      if (res.ok) {
        toast.success("Reply sent to user's email");
        setReplyText("");
        setExpandedReview(null);
      } else {
        toast.error("Failed to send reply");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSendingReply(null);
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      searchQuery === "" ||
      review.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.product?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === "all" || review.rating === parseInt(ratingFilter);

    return matchesSearch && matchesRating;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={
              star <= rating
                ? "fill-amber-500 text-amber-500"
                : "fill-transparent text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  // Stats
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
      : "0.0";
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (r) => reviews.filter((rev) => rev.rating === r).length
  );

  if (loading) {
    return (
      <section className="bg-[#EBE2DB] min-h-screen py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          {/* Header skeleton */}
          <div className="h-8 w-64 skeleton-shimmer rounded mb-8" />
          {/* Stats skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 skeleton-shimmer rounded-lg" />
            ))}
          </div>
          {/* Cards skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-40 skeleton-shimmer rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#EBE2DB] min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-wide">
            CUSTOMER REVIEWS
          </h1>
          <p className="text-sm text-[#6b5e52] mt-1">
            Manage and respond to all product reviews
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F2F1EC] rounded-lg p-5 shadow-sm border border-[#e0dbd4]">
            <p className="text-xs uppercase tracking-wider text-[#8a7d71] mb-1">
              Total Reviews
            </p>
            <p className="text-3xl font-semibold text-[#2D2319]">
              {totalReviews}
            </p>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-5 shadow-sm border border-[#e0dbd4]">
            <p className="text-xs uppercase tracking-wider text-[#8a7d71] mb-1">
              Average Rating
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold text-[#2D2319]">
                {avgRating}
              </p>
              <Star size={20} className="fill-amber-500 text-amber-500" />
            </div>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-5 shadow-sm border border-[#e0dbd4]">
            <p className="text-xs uppercase tracking-wider text-[#8a7d71] mb-2">
              Rating Breakdown
            </p>
            <div className="flex flex-col gap-1">
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-right text-[#6b5e52]">{star}</span>
                  <Star size={10} className="fill-amber-500 text-amber-500" />
                  <div className="flex-1 h-1.5 bg-[#e0dbd4] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{
                        width:
                          totalReviews > 0
                            ? `${(ratingCounts[i] / totalReviews) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <span className="w-6 text-right text-[#8a7d71]">
                    {ratingCounts[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#F2F1EC] rounded-lg p-4 shadow-sm border border-[#e0dbd4] mb-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d71]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user, product, or comment..."
              className="w-full pl-9 pr-8 py-2.5 rounded-md border border-[#d8d3cc] bg-white text-sm focus:outline-none focus:border-[#2D2319] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a7d71] hover:text-[#2D2319]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Rating filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2.5 rounded-md border border-[#d8d3cc] bg-white text-sm focus:outline-none focus:border-[#2D2319] transition min-w-[140px]"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-xs text-[#8a7d71] mb-4">
          Showing {filteredReviews.length} of {totalReviews} reviews
        </p>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-[#F2F1EC] rounded-lg p-12 shadow-sm border border-[#e0dbd4] text-center">
            <p className="text-[#8a7d71] text-sm">No reviews found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#F2F1EC] rounded-lg shadow-sm border border-[#e0dbd4] overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="p-5">
                  {/* Top row: Product + Rating + Date */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    {/* Product info */}
                    <div className="flex items-start gap-3">
                      {review.product?.images?.[0]?.url && (
                        <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-[#e0dbd4]">
                          <img
                            src={review.product.images[0].url}
                            alt={review.product.title || "Product"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/products/${review.product?.slug || ""}`}
                          target="_blank"
                          className="text-sm font-medium text-[#2D2319] hover:underline flex items-center gap-1"
                        >
                          {review.product?.title || "Deleted Product"}
                          <ExternalLink size={12} className="text-[#8a7d71]" />
                        </Link>
                        {review.product?.priceRange && (
                          <p className="text-xs text-[#8a7d71] mt-0.5">
                            ${review.product.priceRange.min} – $
                            {review.product.priceRange.max}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating + Date */}
                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      {renderStars(review.rating)}
                      <span className="text-xs text-[#8a7d71]">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#e0dbd4] mb-4" />

                  {/* User info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[#2D2319] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {(review.user?.name || review.name || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2D2319]">
                        {review.user?.name || review.name || "Unknown User"}
                      </p>
                      {review.user?.email && (
                        <p className="text-xs text-[#8a7d71]">
                          {review.user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Review comment */}
                  <p className="text-sm text-[#3d3428] leading-relaxed mb-3">
                    {review.comment}
                  </p>

                  {/* Review images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {review.images.map((img, idx) => (
                        <a
                          key={idx}
                          href={img.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-16 rounded-md overflow-hidden border border-[#e0dbd4] hover:opacity-80 transition"
                        >
                          <Image
                            src={img.url}
                            alt={`Review image ${idx + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        setExpandedReview(
                          expandedReview === review._id ? null : review._id
                        );
                        setReplyText("");
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#2D2319] text-white hover:bg-[#3d3428] transition"
                    >
                      <Mail size={12} />
                      Reply via Email
                      {expandedReview === review._id ? (
                        <ChevronUp size={12} />
                      ) : (
                        <ChevronDown size={12} />
                      )}
                    </button>

                    <button
                      onClick={() => setDeleteModalId(review._id)}
                      disabled={deletingId === review._id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                    >
                      <Trash2 size={12} />
                      {deletingId === review._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>

                {/* Reply Expanded Section */}
                {expandedReview === review._id && (
                  <div className="border-t border-[#e0dbd4] bg-[#f9f7f4] p-5">
                    <p className="text-xs text-[#8a7d71] mb-2">
                      Send a reply to{" "}
                      <span className="font-medium text-[#2D2319]">
                        {review.user?.email || "user"}
                      </span>
                    </p>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      rows={3}
                      className="w-full p-3 rounded-md border border-[#d8d3cc] bg-white text-sm focus:outline-none focus:border-[#2D2319] transition resize-none"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => {
                          setExpandedReview(null);
                          setReplyText("");
                        }}
                        className="px-4 py-2 rounded-md text-xs font-medium border border-[#d8d3cc] text-[#6b5e52] hover:bg-[#F2F1EC] transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReply(review._id)}
                        disabled={sendingReply === review._id}
                        className="px-4 py-2 rounded-md text-xs font-medium bg-[#2D2319] text-white hover:bg-[#3d3428] transition disabled:opacity-50"
                      >
                        {sendingReply === review._id
                          ? "Sending..."
                          : "Send Reply"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setDeleteModalId(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-[#F2F1EC] rounded-xl shadow-2xl border border-[#e0dbd4] w-full max-w-md p-6 animate-[modalIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                <AlertTriangle size={22} className="text-red-500" />
              </div>
            </div>

            <h3 className="text-center text-lg font-semibold text-[#2D2319] mb-1">
              Delete Review
            </h3>
            <p className="text-center text-sm text-[#6b5e52] mb-5">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>

            {/* Review preview */}
            {(() => {
              const review = reviews.find((r) => r._id === deleteModalId);
              if (!review) return null;
              return (
                <div className="bg-[#f9f7f4] rounded-lg border border-[#e0dbd4] p-3 mb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#2D2319] flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">
                      {(review.user?.name || review.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-[#2D2319]">
                      {review.user?.name || review.name || "Unknown"}
                    </span>
                    <span className="text-[10px] text-[#8a7d71] ml-auto">on</span>
                    <span className="text-xs text-[#6b5e52] font-medium truncate max-w-[140px]">
                      {review.product?.title || "Deleted Product"}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b5e52] line-clamp-2">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
              );
            })()}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModalId(null)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium border border-[#d8d3cc] text-[#6b5e52] hover:bg-[#ebe6e0] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModalId)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-1.5"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
