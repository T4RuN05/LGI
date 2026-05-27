"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  Inbox,
  Send,
  Search,
  X,
  Star,
  MessageSquare,
  ShieldCheck,
  KeyRound,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

const TYPE_CONFIG = {
  contact: {
    label: "Contact Form",
    icon: MessageSquare,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  review_reply: {
    label: "Review Reply",
    icon: Send,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  review_notification: {
    label: "Review Alert",
    icon: Star,
    color: "bg-amber-50 text-amber-600 border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  otp: {
    label: "OTP Verification",
    icon: KeyRound,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-700",
  },
};

export default function AdminMailsPage() {
  const { user } = useAuth();
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [expandedMail, setExpandedMail] = useState(null);

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/mails`,
          { credentials: "include" }
        );

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();
        setMails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  // Filter mails
  const filteredMails = mails.filter((mail) => {
    const matchesSearch =
      searchQuery === "" ||
      mail.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.body?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mail.metadata?.userName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || mail.type === typeFilter;
    const matchesDirection =
      directionFilter === "all" || mail.direction === directionFilter;

    return matchesSearch && matchesType && matchesDirection;
  });

  // Stats
  const totalMails = mails.length;
  const inboundCount = mails.filter((m) => m.direction === "inbound").length;
  const outboundCount = mails.filter((m) => m.direction === "outbound").length;
  const contactCount = mails.filter((m) => m.type === "contact").length;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFullDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="bg-[#EBE2DB] min-h-screen py-10">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="h-8 w-48 skeleton-shimmer rounded mb-2" />
          <div className="h-4 w-64 skeleton-shimmer rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 skeleton-shimmer rounded-lg" />
            ))}
          </div>
          <div className="h-14 skeleton-shimmer rounded-lg mb-6" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-20 skeleton-shimmer rounded-lg" />
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
          <h1 className="text-2xl font-semibold tracking-wide">MAIL LOG</h1>
          <p className="text-sm text-[#6b5e52] mt-1">
            Track all emails sent and received through the platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#F2F1EC] rounded-lg p-4 shadow-sm border border-[#e0dbd4]">
            <div className="flex items-center gap-2 mb-1">
              <Mail size={14} className="text-[#8a7d71]" />
              <p className="text-xs uppercase tracking-wider text-[#8a7d71]">
                Total
              </p>
            </div>
            <p className="text-2xl font-semibold text-[#2D2319]">
              {totalMails}
            </p>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-4 shadow-sm border border-[#e0dbd4]">
            <div className="flex items-center gap-2 mb-1">
              <Inbox size={14} className="text-[#8a7d71]" />
              <p className="text-xs uppercase tracking-wider text-[#8a7d71]">
                Inbound
              </p>
            </div>
            <p className="text-2xl font-semibold text-[#2D2319]">
              {inboundCount}
            </p>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-4 shadow-sm border border-[#e0dbd4]">
            <div className="flex items-center gap-2 mb-1">
              <Send size={14} className="text-[#8a7d71]" />
              <p className="text-xs uppercase tracking-wider text-[#8a7d71]">
                Outbound
              </p>
            </div>
            <p className="text-2xl font-semibold text-[#2D2319]">
              {outboundCount}
            </p>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-4 shadow-sm border border-[#e0dbd4]">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare size={14} className="text-[#8a7d71]" />
              <p className="text-xs uppercase tracking-wider text-[#8a7d71]">
                Inquiries
              </p>
            </div>
            <p className="text-2xl font-semibold text-[#2D2319]">
              {contactCount}
            </p>
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
              placeholder="Search by email, subject, or content..."
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

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-md border border-[#d8d3cc] bg-white text-sm focus:outline-none focus:border-[#2D2319] transition min-w-[155px]"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact Form</option>
            <option value="review_reply">Review Reply</option>
            <option value="review_notification">Review Alert</option>
            <option value="otp">OTP</option>
          </select>

          {/* Direction filter */}
          <select
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
            className="px-4 py-2.5 rounded-md border border-[#d8d3cc] bg-white text-sm focus:outline-none focus:border-[#2D2319] transition min-w-[140px]"
          >
            <option value="all">All Direction</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-xs text-[#8a7d71] mb-4">
          Showing {filteredMails.length} of {totalMails} emails
        </p>

        {/* Mail List */}
        {filteredMails.length === 0 ? (
          <div className="bg-[#F2F1EC] rounded-lg p-12 shadow-sm border border-[#e0dbd4] text-center">
            <Mail size={32} className="mx-auto text-[#c5beb5] mb-3" />
            <p className="text-[#8a7d71] text-sm">No emails found.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMails.map((mail) => {
              const config = TYPE_CONFIG[mail.type] || TYPE_CONFIG.contact;
              const TypeIcon = config.icon;
              const isExpanded = expandedMail === mail._id;

              return (
                <div
                  key={mail._id}
                  className="bg-[#F2F1EC] rounded-lg shadow-sm border border-[#e0dbd4] overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  {/* Main row — clickable */}
                  <button
                    onClick={() =>
                      setExpandedMail(isExpanded ? null : mail._id)
                    }
                    className="w-full flex items-center gap-3 p-4 text-left transition hover:bg-[#eee9e3]"
                  >
                    {/* Icon */}
                    <div
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${config.color}`}
                    >
                      <TypeIcon size={16} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-[#2D2319] truncate">
                          {mail.subject}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#8a7d71]">
                        {mail.direction === "inbound" ? (
                          <span className="flex items-center gap-1">
                            <Inbox size={10} />
                            From: {mail.metadata?.userName || mail.from}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Send size={10} />
                            To: {mail.to}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side: badge + date + chevron */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${config.badgeColor}`}
                      >
                        {config.label}
                      </span>
                      <span className="text-[11px] text-[#8a7d71] min-w-[60px] text-right">
                        {formatDate(mail.createdAt)}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={14} className="text-[#8a7d71]" />
                      ) : (
                        <ChevronDown size={14} className="text-[#8a7d71]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="border-t border-[#e0dbd4] bg-[#f9f7f4] p-5">
                      {/* Meta grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-0.5">
                            From
                          </span>
                          <span className="text-sm text-[#2D2319]">
                            {mail.from}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-0.5">
                            To
                          </span>
                          <span className="text-sm text-[#2D2319]">
                            {mail.to}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-0.5">
                            Date
                          </span>
                          <span className="text-sm text-[#2D2319]">
                            {formatFullDate(mail.createdAt)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-0.5">
                            Type
                          </span>
                          <span
                            className={`text-xs inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full font-medium ${config.badgeColor}`}
                          >
                            <TypeIcon size={10} />
                            {config.label}
                          </span>
                        </div>
                      </div>

                      {/* User info (if available) */}
                      {mail.metadata?.userName && (
                        <div className="bg-white rounded-lg border border-[#e6e1da] p-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#2D2319] flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                              {mail.metadata.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#2D2319]">
                                {mail.metadata.userName}
                              </p>
                              {mail.metadata.userEmail && (
                                <p className="text-xs text-[#8a7d71]">
                                  {mail.metadata.userEmail}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Product link (for review types) */}
                      {mail.metadata?.productTitle && (
                        <div className="bg-white rounded-lg border border-[#e6e1da] p-3 mb-3 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-0.5">
                              Product
                            </p>
                            <p className="text-sm font-medium text-[#2D2319]">
                              {mail.metadata.productTitle}
                            </p>
                          </div>
                          {mail.metadata.productSlug && (
                            <Link
                              href={`/products/${mail.metadata.productSlug}`}
                              target="_blank"
                              className="text-xs text-[#6b5e52] hover:text-[#2D2319] flex items-center gap-1 transition"
                            >
                              View
                              <ExternalLink size={10} />
                            </Link>
                          )}
                        </div>
                      )}

                      {/* Rating (for review types) */}
                      {mail.metadata?.rating && (
                        <div className="flex items-center gap-1 mb-3">
                          <span className="text-[10px] uppercase tracking-wider text-[#8a7d71] mr-1">
                            Rating
                          </span>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={`text-xs ${
                                s <= mail.metadata.rating
                                  ? "text-amber-500"
                                  : "text-[#d8d3cc]"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Body / Message */}
                      {mail.body && (
                        <div className="bg-white rounded-lg border border-[#e6e1da] p-4">
                          <p className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-2">
                            {mail.type === "contact" ? "Message" : mail.type === "review_reply" ? "Admin Reply" : "Content"}
                          </p>
                          <p className="text-sm text-[#3d3428] leading-relaxed whitespace-pre-wrap">
                            {mail.body}
                          </p>
                        </div>
                      )}

                      {/* Review comment (for review reply/notification) */}
                      {mail.metadata?.reviewComment && mail.type !== "contact" && (
                        <div className="bg-white rounded-lg border border-[#e6e1da] p-4 mt-3">
                          <p className="text-[10px] uppercase tracking-wider text-[#8a7d71] mb-2">
                            Original Review
                          </p>
                          <p className="text-sm text-[#6b5e52] leading-relaxed italic">
                            &ldquo;{mail.metadata.reviewComment}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
