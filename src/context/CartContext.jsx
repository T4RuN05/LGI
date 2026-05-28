"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

const CART_KEY = "lgi-cart";

function loadCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { user } = useAuth();
  const syncTimeoutRef = useRef(null);
  const prevUserRef = useRef(user);

  // Handle auth transitions (login/logout)
  useEffect(() => {
    // Logout
    if (prevUserRef.current && !user) {
      setItems([]);
      localStorage.removeItem(CART_KEY);
    }
    // Login
    else if (!prevUserRef.current && user) {
      const fetchUserCart = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            if (data.items && Array.isArray(data.items)) {
              setItems((prevItems) => {
                const merged = [...data.items];
                prevItems.forEach((localItem) => {
                  const existing = merged.find(
                    (m) => m.product._id === localItem.product._id
                  );
                  if (existing) {
                    existing.quantity = Math.max(
                      existing.quantity,
                      localItem.quantity
                    );
                  } else {
                    merged.push(localItem);
                  }
                });
                return merged;
              });
            }
          }
        } catch (err) {
          console.error("Error fetching cart on login:", err);
        }
      };
      fetchUserCart();
    }

    prevUserRef.current = user;
  }, [user]);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Save to localStorage on every change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    saveCart(items);
  }, [items, hydrated]);

  // Debounced sync to backend for signed-in users
  const syncToBackend = useCallback(
    (cartItems) => {
      if (!user) return;

      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }

      syncTimeoutRef.current = setTimeout(async () => {
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/cart/sync`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                items: cartItems.map((item) => ({
                  productId: item.product._id,
                  quantity: item.quantity,
                })),
              }),
            }
          );
        } catch {
          // Silent fail — sync is non-critical
        }
      }, 1500);
    },
    [user]
  );

  // Trigger sync when items change
  useEffect(() => {
    if (!hydrated) return;
    syncToBackend(items);
  }, [items, hydrated, syncToBackend]);

  const addToCart = useCallback(
    (product) => {
      const isExisting = items.some((item) => item.product._id === product._id);
      
      if (isExisting) {
        toast.success("Already in cart — quantity updated!", {
          icon: "🛒",
        });
      } else {
        toast.success("Added to cart!", { icon: "🛒" });
      }

      setItems((prev) => {
        const existing = prev.find((item) => item.product._id === product._id);
        if (existing) {
          return prev.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + (product.moq || 1) }
              : item
          );
        }

        return [
          ...prev,
          {
            product: {
              _id: product._id,
              title: product.title,
              slug: product.slug,
              images: product.images,
              priceRange: product.priceRange,
              moq: product.moq,
              moqUnit: product.moqUnit,
            },
            quantity: product.moq || 1,
          },
        ];
      });
    },
    [items]
  );

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
    toast.success("Removed from cart", { icon: "🗑️" });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success("Cart cleared", { icon: "🗑️" });
  }, []);

  const isInCart = useCallback(
    (productId) => items.some((item) => item.product._id === productId),
    [items]
  );

  const cartCount = items.reduce((sum, item) => sum + 1, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        openCart,
        closeCart,
        toggleCart,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
