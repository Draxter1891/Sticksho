import { Heart } from "lucide-react";
import { useNavigate } from "react-router";

import { useApp } from "../../context/AppContext";
import { CATEGORY_META } from "../../data/categories";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    addToCart,
    wishlist,
    toggleWishlist,
  } = useApp();

  const isSaved = wishlist.includes(product.id);

  const catMeta =
    CATEGORY_META[product.category] || {
      badgeBg: "bg-lemon",
      color: "#FFE814",
    };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex cursor-pointer flex-col justify-between rounded-2xl border-2 border-ink bg-white p-3 shadow-sticker-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-sticker peel-corner"
    >
      <div>
        {/* Image Frame */}
        <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl border border-ink bg-sand/40">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Category */}
          <span
            className={`
              absolute left-2.5 top-2.5
              rounded-full border border-ink
              px-2 py-0.5
              text-[10px] font-extrabold uppercase
              tracking-wider text-ink
              shadow-sticker-sm
              ${catMeta.badgeBg}
            `}
          >
            {product.category}
          </span>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            className={`
              absolute right-2.5 top-2.5
              grid h-8 w-8 place-items-center
              rounded-full border-2 border-ink
              shadow-sticker-sm
              transition
              ${
                isSaved
                  ? "bg-coral text-white"
                  : "bg-white/90 text-ink hover:bg-white"
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
                : "Add to wishlist"
            }
          >
            <Heart
              size={16}
              strokeWidth={2.2}
              fill={
                isSaved
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

          {/* Product Badge */}
          {product.badge && (
            <span className="absolute bottom-2 left-2 rounded-md border border-white bg-ink px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-white">
              {product.badge}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mb-1 flex items-center gap-1.5 text-xs">
          <span className="font-bold text-amber-500">
            ★ {product.rating}
          </span>

          <span className="font-medium text-ink/40">
            ({product.reviews})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="mb-1 line-clamp-2 font-display text-sm font-extrabold leading-snug transition-colors group-hover:text-coral sm:text-base">
          {product.name}
        </h3>

        {/* Finish */}
        <p className="mb-3 line-clamp-1 text-[11px] font-medium text-ink/60">
          {product.finish ||
            "Waterproof Matte Vinyl"}
        </p>
      </div>

      {/* Pricing + Add */}
      <div className="flex items-center justify-between border-t border-ink/10 pt-2">
        <div>
          <span className="text-xs font-bold text-ink/50">
            Pack of
          </span>

          <div className="font-display text-lg font-extrabold leading-none sm:text-xl">
            ₹{product.price}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex items-center gap-1 rounded-xl border-2 border-ink bg-ink px-3.5 py-2 text-xs font-extrabold text-white shadow-sticker-sm transition-all hover:-translate-y-0.5 hover:bg-lemon hover:text-ink"
        >
          <span>+ Bag</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;