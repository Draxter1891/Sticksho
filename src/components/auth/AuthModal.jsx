import { useState } from "react";
import { X } from "lucide-react";

import { useApp } from "../../context/AppContext";

const AuthModal = () => {
  const {
    isAuthOpen,
    setIsAuthOpen,
    loginOrSignup,
  } = useApp();

  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  if (!isAuthOpen) {
    return null;
  }

  const resetError = () => {
    if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please provide your name");
      return;
    }

    if (
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setError("Enter a valid email address");
      return;
    }

    if (
      !phone.trim() ||
      !/^[6-9]\d{9}$/.test(phone.trim())
    ) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    setError("");

    loginOrSignup({
      name,
      email,
      phone,
    });
  };

  const switchMode = (signup) => {
    setIsSignup(signup);
    setError("");
  };

  const handleClose = () => {
    setIsAuthOpen(false);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md space-y-5 rounded-3xl border-2 border-ink bg-white p-6 shadow-sticker-lg sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="rounded border border-ink bg-lemon px-2 py-0.5 text-[10px] font-extrabold uppercase">
              DELHI STICKER PASS
            </span>

            <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">
              {isSignup
                ? "Create Account"
                : "Welcome Back"}
            </h2>

            <p className="mt-0.5 text-xs font-medium text-ink/70">
              Guest bag & wishlist items will be preserved
              and merged automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-ink bg-sand text-xs font-bold transition hover:bg-coral hover:text-white"
            aria-label="Close authentication modal"
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        {/* Login / Signup Toggle */}
        <div className="flex gap-1 rounded-xl border border-ink bg-sand/60 p-1 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => switchMode(false)}
            className={`
              flex-1 rounded-lg py-1.5 transition
              ${
                !isSignup
                  ? "border border-ink bg-white text-ink shadow-sticker-sm"
                  : "text-ink/60 hover:text-ink"
              }
            `}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => switchMode(true)}
            className={`
              flex-1 rounded-lg py-1.5 transition
              ${
                isSignup
                  ? "border border-ink bg-white text-ink shadow-sticker-sm"
                  : "text-ink/60 hover:text-ink"
              }
            `}
          >
            Sign Up
          </button>
        </div>

        {/* Validation Error */}
        {error && (
          <div className="rounded-xl border border-coral bg-coral/10 p-2.5 text-center text-xs font-bold text-coral">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-3.5"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              Your Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                resetError();
              }}
              placeholder="e.g. John Doe"
              className="w-full rounded-xl border border-ink bg-sand/40 px-3.5 py-2 text-xs font-semibold outline-none focus:bg-white sm:text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                resetError();
              }}
              placeholder="john@example.com"
              className="w-full rounded-xl border border-ink bg-sand/40 px-3.5 py-2 text-xs font-semibold outline-none focus:bg-white sm:text-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              WhatsApp Mobile (10 Digits)
            </label>

            <input
              type="tel"
              maxLength={10}
              value={phone}
              onChange={(e) => {
                setPhone(
                  e.target.value.replace(/\D/g, ""),
                );
                resetError();
              }}
              placeholder="9876543210"
              className="w-full rounded-xl border border-ink bg-sand/40 px-3.5 py-2 text-xs font-semibold outline-none focus:bg-white sm:text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full rounded-2xl border border-ink bg-lemon py-3 font-display text-sm font-extrabold text-ink shadow-sticker transition hover:-translate-y-0.5 hover:bg-lemon/90"
          >
            {isSignup
              ? "Sign Up & Merge Bag"
              : "Login & Proceed"}
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-center text-[10px] font-medium text-ink/50">
          By proceeding, you verify your delivery location
          falls inside Delhi territory.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;