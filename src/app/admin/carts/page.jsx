"use client";

import { useEffect, useState } from "react";
import { Search, X, ShoppingBag, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminCartsPage() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCart, setExpandedCart] = useState(null);

  const fetchCarts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/carts`,
        { credentials: "include" }
      );

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setCarts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  // Filter carts
  const filteredCarts = carts.filter((cart) => {
    if (searchQuery === "") return true;
    const q = searchQuery.toLowerCase();
    return (
      cart.user?.name?.toLowerCase().includes(q) ||
      cart.user?.email?.toLowerCase().includes(q) ||
      cart.items?.some((item) =>
        item.product?.title?.toLowerCase().includes(q)
      )
    );
  });

  // Stats
  const totalCarts = carts.length;
  const totalItems = carts.reduce((sum, cart) => sum + cart.items.length, 0);

  const totalValueRange = carts.reduce(
    (acc, cart) => {
      cart.items.forEach((item) => {
        if (!item.product) return;
        acc.min += (item.product.priceRange?.min || 0) * item.quantity;
        acc.max += (item.product.priceRange?.max || 0) * item.quantity;
      });
      return acc;
    },
    { min: 0, max: 0 }
  );

  if (loading) {
    return (
      <section className="bg-[#EBE2DB] min-h-screen py-20">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="h-8 w-64 skeleton-shimmer rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 skeleton-shimmer rounded-lg" />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 skeleton-shimmer rounded-lg" />
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
            CUSTOMER CARTS
          </h1>
          <p className="text-sm text-[#6b5e52] mt-1">
            View products that signed-in users have added to their carts
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#F2F1EC] rounded-lg p-5 shadow-sm border border-[#e0dbd4]">
            <p className="text-xs uppercase tracking-wider text-[#8a7d71] mb-1">
              Active Carts
            </p>
            <p className="text-3xl font-semibold text-[#2D2319]">
              {totalCarts}
            </p>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-5 shadow-sm border border-[#e0dbd4]">
            <p className="text-xs uppercase tracking-wider text-[#8a7d71] mb-1">
              Total Products
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-semibold text-[#2D2319]">
                {totalItems}
              </p>
              <ShoppingBag size={20} className="text-[#8a7d71]" />
            </div>
          </div>

          <div className="bg-[#F2F1EC] rounded-lg p-5 shadow-sm border border-[#e0dbd4]">
            <p className="text-xs uppercase tracking-wider text-[#8a7d71] mb-1">
              Total Value Range
            </p>
            <p className="text-xl font-semibold text-[#2D2319]">
              ${totalValueRange.min.toFixed(2)} – $
              {totalValueRange.max.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-[#F2F1EC] rounded-lg p-4 shadow-sm border border-[#e0dbd4] mb-6">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d71]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by user name, email, or product..."
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
        </div>

        {/* Results count */}
        <p className="text-xs text-[#8a7d71] mb-4">
          Showing {filteredCarts.length} of {totalCarts} carts
        </p>

        {/* Carts List */}
        {filteredCarts.length === 0 ? (
          <div className="bg-[#F2F1EC] rounded-lg p-12 shadow-sm border border-[#e0dbd4] text-center">
            <ShoppingBag size={40} className="text-[#d8d3cc] mx-auto mb-3" />
            <p className="text-[#8a7d71] text-sm">No customer carts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCarts.map((cart) => {
              const isExpanded = expandedCart === cart._id;
              const cartTotal = cart.items.reduce(
                (acc, item) => {
                  if (!item.product) return acc;
                  return {
                    min:
                      acc.min +
                      (item.product.priceRange?.min || 0) * item.quantity,
                    max:
                      acc.max +
                      (item.product.priceRange?.max || 0) * item.quantity,
                  };
                },
                { min: 0, max: 0 }
              );

              return (
                <div
                  key={cart._id}
                  className="bg-[#F2F1EC] rounded-lg shadow-sm border border-[#e0dbd4] overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  {/* Cart Header */}
                  <button
                    onClick={() =>
                      setExpandedCart(isExpanded ? null : cart._id)
                    }
                    className="w-full p-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      {/* User Avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#2D2319] flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {(cart.user?.name || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2D2319]">
                          {cart.user?.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-[#8a7d71]">
                          {cart.user?.email || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Items count */}
                      <div className="flex items-center gap-1.5 bg-[#EBE2DB] px-3 py-1 rounded-full">
                        <ShoppingBag size={14} className="text-[#6b5e52]" />
                        <span className="text-xs font-medium text-[#2D2319]">
                          {cart.items.length}{" "}
                          {cart.items.length === 1 ? "item" : "items"}
                        </span>
                      </div>

                      {/* Total */}
                      <span className="text-sm font-semibold text-[#2D2319] hidden sm:block">
                        ${cartTotal.min.toFixed(2)} – $
                        {cartTotal.max.toFixed(2)}
                      </span>

                      {/* Updated */}
                      <span className="text-xs text-[#8a7d71] hidden md:block">
                        {new Date(cart.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>

                      {isExpanded ? (
                        <ChevronUp size={16} className="text-[#8a7d71]" />
                      ) : (
                        <ChevronDown size={16} className="text-[#8a7d71]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Items */}
                  {isExpanded && (
                    <div className="border-t border-[#e0dbd4] bg-[#f9f7f4]">
                      <div className="divide-y divide-[#e6e1da]">
                        {cart.items.map((item, idx) => {
                          if (!item.product) return null;
                          const itemMin =
                            (item.product.priceRange?.min || 0) * item.quantity;
                          const itemMax =
                            (item.product.priceRange?.max || 0) * item.quantity;

                          return (
                            <div
                              key={idx}
                              className="flex items-center gap-4 px-5 py-3"
                            >
                              {/* Product image */}
                              {item.product.images?.[0]?.url && (
                                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border border-[#e0dbd4] bg-white">
                                  <img
                                    src={item.product.images[0].url}
                                    alt={item.product.title || "Product"}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              )}

                              {/* Product details */}
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/products/${item.product.slug || ""}`}
                                  target="_blank"
                                  className="text-sm font-medium text-[#2D2319] hover:underline flex items-center gap-1"
                                >
                                  <span className="truncate">
                                    {item.product.title || "Deleted Product"}
                                  </span>
                                  <ExternalLink
                                    size={12}
                                    className="text-[#8a7d71] flex-shrink-0"
                                  />
                                </Link>
                                <p className="text-xs text-[#8a7d71]">
                                  MOQ: {item.product.moq}{" "}
                                  {item.product.moqUnit}
                                </p>
                              </div>

                              {/* Quantity */}
                              <div className="text-center flex-shrink-0">
                                <p className="text-xs text-[#8a7d71]">Qty</p>
                                <p className="text-sm font-semibold text-[#2D2319]">
                                  {item.quantity} <span className="text-xs font-normal text-[#8a7d71] lowercase">{item.product.moqUnit || "pieces"}</span>
                                </p>
                              </div>

                              {/* Price */}
                              <div className="text-right flex-shrink-0">
                                <p className="text-sm font-medium text-[#2D2319]">
                                  ${itemMin.toFixed(2)} – ${itemMax.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Cart Total Footer */}
                      <div className="flex items-center justify-between px-5 py-3 bg-[#F2F1EC] border-t border-[#e0dbd4]">
                        <span className="text-xs text-[#6b5e52] uppercase tracking-wider">
                          Cart Total Range
                        </span>
                        <span className="text-base font-semibold text-[#2D2319]">
                          ${cartTotal.min.toFixed(2)} – $
                          {cartTotal.max.toFixed(2)}
                        </span>
                      </div>
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
