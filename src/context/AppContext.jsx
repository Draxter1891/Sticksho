import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router";
import toast from "react-hot-toast";

import { PRODUCTS } from "../data/products";
import CustomToast from "../components/toast/CustomToast";

const AppContext = createContext(null);

// STORAGE KEYS

const LS_GUEST_CART = "otakun_guest_cart";
const LS_GUEST_WISH = "otakun_guest_wish";
const LS_AUTH_USER = "otakun_auth_user";

// STORAGE HELPERS

const getStorageData = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

// APP PROVIDER

export const AppProvider = () => {
  const navigate = useNavigate();

  // AUTHENTICATION STATE

  const [user, setUser] = useState(() => getStorageData(LS_AUTH_USER, null));

  // CART STATE

  const [cart, setCart] = useState(() => {
    const savedUser = getStorageData(LS_AUTH_USER, null);

    const key = savedUser ? `otakun_cart_${savedUser.email}` : LS_GUEST_CART;

    return getStorageData(key, []);
  });

  // WISHLIST STATE

  const [wishlist, setWishlist] = useState(() => {
    const savedUser = getStorageData(LS_AUTH_USER, null);

    const key = savedUser ? `otakun_wish_${savedUser.email}` : LS_GUEST_WISH;

    return getStorageData(key, []);
  });

  // AUTH MODAL STATE

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // "checkout" when user needs to authenticate
  // before proceeding to checkout.
  const [authIntent, setAuthIntent] = useState(null);

  // TOAST

  const addToast = useCallback((message, type = "success") => {
    toast.custom(
      (t) => <CustomToast toastId={t.id} message={message} type={type} />,
      {
        duration: 2800,
      },
    );
  }, []);

  // CART STORAGE SYNC

  useEffect(() => {
    const key = user ? `otakun_cart_${user.email}` : LS_GUEST_CART;

    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);

  // WISHLIST STORAGE SYNC

  useEffect(() => {
    const key = user ? `otakun_wish_${user.email}` : LS_GUEST_WISH;

    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  // CART ACTIONS

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const product = PRODUCTS.find((item) => item.id === productId);

      if (!product) {
        return;
      }

      setCart((previousCart) => {
        const existingItem = previousCart.find((item) => item.id === productId);

        // Existing item → increase quantity
        if (existingItem) {
          return previousCart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  qty: Math.min(20, item.qty + quantity),
                }
              : item,
          );
        }

        // New item
        return [
          ...previousCart,
          {
            id: productId,
            qty: quantity,
          },
        ];
      });

      addToast(`Slapped "${product.name}" into cart! 💥`);
    },
    [addToast],
  );

  const updateCartQty = useCallback((productId, newQty) => {
    if (newQty <= 0) {
      setCart((previousCart) =>
        previousCart.filter((item) => item.id !== productId),
      );

      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              qty: Math.min(20, newQty),
            }
          : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback(
    (productId) => {
      const product = PRODUCTS.find((item) => item.id === productId);

      setCart((previousCart) =>
        previousCart.filter((item) => item.id !== productId),
      );

      if (product) {
        addToast(`Removed "${product.name}"`, "info");
      }
    },
    [addToast],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // WISHLIST

  const toggleWishlist = useCallback(
    (productId) => {
      const product = PRODUCTS.find((item) => item.id === productId);

      setWishlist((previousWishlist) => {
        const isAlreadySaved = previousWishlist.includes(productId);

        if (isAlreadySaved) {
          return previousWishlist.filter((id) => id !== productId);
        }

        return [...previousWishlist, productId];
      });

      if (wishlist.includes(productId)) {
        addToast("Removed from Wishlist");
      } else {
        addToast(
          `Saved "${product ? product.name : "Sticker"}" to Wishlist! ❤️`,
        );
      }
    },
    [addToast, wishlist],
  );

  // LOGIN / SIGNUP

  const loginOrSignup = useCallback(
    ({ name, email, phone }) => {
      const normalizedEmail = email.trim().toLowerCase();

      const newUser = {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
      };

      // 1. Retrieve previous account data

      const priorCart = getStorageData(`otakun_cart_${normalizedEmail}`, []);

      const priorWish = getStorageData(`otakun_wish_${normalizedEmail}`, []);

      // 2. Merge guest cart with account cart

      const mergedCart = [...priorCart];

      cart.forEach((guestItem) => {
        const existingIndex = mergedCart.findIndex(
          (item) => item.id === guestItem.id,
        );

        if (existingIndex > -1) {
          mergedCart[existingIndex].qty = Math.min(
            20,
            mergedCart[existingIndex].qty + guestItem.qty,
          );
        } else {
          mergedCart.push({
            ...guestItem,
          });
        }
      });

      // 3. Merge wishlist

      const mergedWishlist = Array.from(new Set([...priorWish, ...wishlist]));

      // 4. Update React state

      setUser(newUser);
      setCart(mergedCart);
      setWishlist(mergedWishlist);

      // 5. Persist authenticated data

      localStorage.setItem(LS_AUTH_USER, JSON.stringify(newUser));

      localStorage.setItem(
        `otakun_cart_${normalizedEmail}`,
        JSON.stringify(mergedCart),
      );

      localStorage.setItem(
        `otakun_wish_${normalizedEmail}`,
        JSON.stringify(mergedWishlist),
      );

      // 6. Remove guest data

      localStorage.removeItem(LS_GUEST_CART);
      localStorage.removeItem(LS_GUEST_WISH);

      // 7. Close auth modal

      setIsAuthOpen(false);

      addToast(`Welcome back, ${newUser.name}! Cart synced`);

      // 8. Continue checkout if that was
      //    the original user intention

      if (authIntent === "checkout") {
        navigate("/checkout");
      }

      setAuthIntent(null);
    },
    [cart, wishlist, authIntent, navigate, addToast],
  );

  // LOGOUT

  const logout = useCallback(() => {
    setUser(null);

    localStorage.removeItem(LS_AUTH_USER);

    // Reset guest state after logout
    setCart([]);
    setWishlist([]);

    addToast("Logged out successfully", "info");

    navigate("/");
  }, [navigate, addToast]);

  // CART CALCULATIONS
  const cartDetails = useMemo(() => {
    const items = cart
      .map((cartItem) => {
        const product = PRODUCTS.find((item) => item.id === cartItem.id);

        if (!product) {
          return null;
        }

        return {
          ...product,
          qty: cartItem.qty,
          lineTotal: product.price * cartItem.qty,
        };
      })
      .filter(Boolean);

    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

    // Original business rule:
    // ₹500+ = free delivery
    // below ₹500 = ₹40
    // empty cart = ₹0
    const deliveryCharge = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 40;

    const finalTotal = subtotal + deliveryCharge;

    const totalItemsCount = items.reduce((sum, item) => sum + item.qty, 0);

    return {
      items,
      subtotal,
      deliveryCharge,
      finalTotal,
      totalItemsCount,
    };
  }, [cart]);

  //Values for the context
  const value = useMemo(
    () => ({
      // Auth
      user,
      loginOrSignup,
      logout,

      // Auth modal
      isAuthOpen,
      setIsAuthOpen,
      authIntent,
      setAuthIntent,

      // Cart
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartDetails,

      // Wishlist
      wishlist,
      toggleWishlist,

      // Toast
      addToast,
    }),
    [
      user,
      loginOrSignup,
      logout,
      isAuthOpen,
      authIntent,
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartDetails,
      wishlist,
      toggleWishlist,
      addToast,
    ],
  );

  return (
    <AppContext.Provider value={value}>
      <Outlet />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};
