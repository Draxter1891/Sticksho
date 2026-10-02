import { useState } from "react";
import {
  ShoppingBag,
  UserRound,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

import OtakunLogo from "./OtakunLogo";
import { useApp } from "../../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartDetails,
    wishlist,
    user,
    setIsAuthOpen,
    logout,
  } = useApp();

  const [mobileMenu, setMobileMenu] = useState(false);

  const currentPath = location.pathname;

  const navLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "All Stickers",
      path: "/products",
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      count: wishlist.length,
    },
    {
      label: "Cart",
      path: "/cart",
      count: cartDetails.totalItemsCount,
      highlight: true,
    },
  ];

  const isActiveRoute = (path) => {
    if (path === "/") {
      return currentPath === "/";
    }

    return (
      currentPath === path ||
      currentPath.startsWith(`${path}/`)
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavigation("/")}
          className="shrink-0"
          aria-label="Go to homepage"
        >
          <OtakunLogo />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1.5 rounded-full border border-ink bg-sand/60 p-1 shadow-sticker-sm md:flex">
          {navLinks.map((item) => {
            const isActive = isActiveRoute(item.path);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative flex items-center gap-1.5
                  rounded-full px-4 py-1.5
                  text-xs font-bold
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-ink text-white shadow-sticker-sm"
                      : "text-ink hover:bg-white hover:text-ink"
                  }
                `}
              >
                <span>{item.label}</span>

                {Boolean(item.count && item.count > 0) && (
                  <span
                    className={`
                      rounded-full px-1.5 py-0.2
                      text-[10px] font-extrabold
                      ${
                        isActive
                          ? "bg-lemon text-ink"
                          : "bg-ink text-white"
                      }
                    `}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2 rounded-full border border-ink bg-white px-3 py-1 text-xs shadow-sticker-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-mint" />

              <span className="max-w-25 truncate font-extrabold">
                {user.name?.split(" ")[0]}
              </span>

              <button
                type="button"
                onClick={logout}
                className="ml-1 text-ink/60 transition hover:text-coral"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={18} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="hidden items-center gap-1 rounded-full border border-ink bg-white px-3.5 py-1.5 text-xs font-extrabold text-ink shadow-sticker-sm transition hover:bg-lemon sm:inline-flex"
            >
              <UserRound size={14} strokeWidth={2.5} />
              Login
            </button>
          )}

          {/* Cart */}
          <button
            type="button"
            onClick={() => handleNavigation("/cart")}
            className="relative flex items-center gap-2 rounded-full border border-ink bg-lemon px-3.5 py-1.5 text-xs font-extrabold text-ink shadow-sticker-sm transition hover:-translate-y-0.5 hover:bg-lemon/90"
          >
            <ShoppingBag size={16} strokeWidth={2.5} />

            <span className="hidden sm:inline">
              Bag
            </span>

            <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] font-extrabold text-white">
              {cartDetails.totalItemsCount}
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink bg-white shadow-sticker-sm md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? (
              <X size={20} strokeWidth={2.5} />
            ) : (
              <Menu size={20} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drop Menu */}
      {mobileMenu && (
        <div className="space-y-2.5 border-t-2 border-ink bg-paper px-4 py-4 md:hidden">
          {navLinks.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNavigation(item.path)}
              className={`
                flex w-full items-center justify-between
                rounded-xl border border-ink
                px-4 py-2.5
                text-sm font-bold
                shadow-sticker-sm
                ${
                  isActiveRoute(item.path)
                    ? "bg-ink text-white"
                    : "bg-white text-ink"
                }
              `}
            >
              <span>{item.label}</span>

              {Boolean(item.count && item.count > 0) && (
                <span className="rounded-full border border-ink bg-lemon px-2 py-0.5 text-xs font-extrabold text-ink">
                  {item.count}
                </span>
              )}
            </button>
          ))}

          {/* Mobile Login */}
          {!user && (
            <button
              type="button"
              onClick={() => {
                setMobileMenu(false);
                setIsAuthOpen(true);
              }}
              className="w-full rounded-xl border border-ink bg-lemon py-2.5 text-center text-sm font-extrabold shadow-sticker-sm"
            >
              Login / Sign Up for Delhi Drops
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;