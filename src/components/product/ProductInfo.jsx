import { Heart, Minus, Plus } from "lucide-react";

import { useApp } from "../../context/AppContext";
import { CATEGORY_META } from "../../data/categories";
import { useState } from "react";

const ProductInfo = ({ product }) => {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  const isSaved = wishlist.includes(product.id);

  const catMeta =
    CATEGORY_META[product.category] || {
      badgeBg: "bg-lemon",
    };

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1),
    );
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(20, current + 1),
    );
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
      <div>
        {/* Category + Rating */}
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`
              rounded-full
              border border-ink
              px-3 py-0.5
              text-xs font-extrabold uppercase
              text-ink
              ${catMeta.badgeBg}
            `}
          >
            {product.category}
          </span>

          <div className="flex items-center gap-1 rounded-full border border-ink bg-sand px-2.5 py-0.5 text-xs font-bold">
            <span className="text-amber-500">
              ★
            </span>

            <span>
              {product.rating}
            </span>

            <span className="text-ink/40">
              ({product.reviews} Delhi reviews)
            </span>
          </div>
        </div>

        {/* Product Name */}
        <h1 className="mb-2 font-display text-2xl font-extrabold leading-tight sm:text-4xl">
          {product.name}
        </h1>

        {/* Price */}
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            ₹{product.price}
          </span>

          <span className="rounded-md bg-sand px-2 py-0.5 text-xs font-bold text-ink/50">
            Inclusive of all local packing
          </span>
        </div>

        {/* Description */}
        <p className="mb-6 text-xs font-medium leading-relaxed text-ink/80 sm:text-sm">
          {product.desc}
        </p>

        {/* Features */}
        <div className="mb-6 space-y-2 rounded-2xl border-2 border-ink bg-sand/40 p-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-mint">
              ✓
            </span>

            <span>
              100% Waterproof Matte Vinyl • Tear &
              Scratch Resistant
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-black text-mint">
              ✓
            </span>

            <span>
              Dispatched across all 13 Delhi districts
              within 24–48 hours
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-black text-mint">
              ✓
            </span>

            <span>
              No upfront gateway payment — pay on
              WhatsApp confirmation
            </span>
          </div>
        </div>
      </div>

      {/* Purchase Actions */}
      <div className="space-y-3 border-t-2 border-ink/10 pt-4">
        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center rounded-xl border-2 border-ink bg-sand p-1 shadow-sticker-sm">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="grid h-8 w-8 place-items-center rounded-lg border border-ink bg-white font-extrabold transition hover:bg-lemon"
              aria-label="Decrease quantity"
            >
              <Minus size={14} strokeWidth={2.5} />
            </button>

            <span className="w-10 text-center font-display text-sm font-extrabold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              className="grid h-8 w-8 place-items-center rounded-lg border border-ink bg-white font-extrabold transition hover:bg-lemon"
              aria-label="Increase quantity"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-ink px-4 py-3 font-display text-sm font-extrabold text-white shadow-sticker transition hover:-translate-y-0.5 hover:bg-lemon hover:text-ink sm:text-base"
          >
            <span>Slap into Bag</span>

            <span>•</span>

            <span>
              ₹{product.price * quantity}
            </span>
          </button>

          {/* Wishlist */}
          <button
            type="button"
            onClick={() =>
              toggleWishlist(product.id)
            }
            className={`
              grid h-12 w-12 place-items-center
              rounded-xl
              border-2 border-ink
              shadow-sticker-sm
              transition
              ${
                isSaved
                  ? "bg-coral text-white"
                  : "bg-white hover:bg-sand"
              }
            `}
            title={
              isSaved
                ? "Saved"
                : "Save to wishlist"
            }
            aria-label={
              isSaved
                ? "Remove from wishlist"
                : "Save to wishlist"
            }
          >
            <Heart
              size={20}
              strokeWidth={2.2}
              fill={
                isSaved
                  ? "currentColor"
                  : "none"
              }
            />
          </button>
        </div>

        {/* Shipping Note */}
        <p className="text-center text-[11px] font-medium text-ink/60">
          🛵 Free shipping on Delhi orders above ₹500
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;