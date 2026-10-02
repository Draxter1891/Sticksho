import { useNavigate } from "react-router";

import { useApp } from "../context/AppContext";
import { PRODUCTS } from "../data/products";

import ProductCard from "../components/product/ProductCard";

const WishlistPage = () => {
  const { wishlist } = useApp();
  const navigate = useNavigate();

  const savedProducts = PRODUCTS.filter((product) =>
    wishlist.includes(product.id),
  );

  // Empty wishlist
  if (savedProducts.length === 0) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-3xl bg-white p-8 text-center shadow-sticker sticker-border">
        <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-coral/20 text-4xl sticker-border">
          ❤️
        </div>

        <h2 className="mb-1 font-display text-2xl font-extrabold">
          Your wishlist is empty
        </h2>

        <p className="mb-6 text-xs font-medium text-ink/70">
          Spot stickers you love while browsing? Tap the heart icon to
          save them for your next drop run.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="rounded-full bg-ink px-6 py-2.5 text-xs font-extrabold text-white shadow-sticker sticker-border"
        >
          Browse Stickers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-ink pb-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-coral">
            SAVED STICKERS
          </span>

          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Your Wishlist ({savedProducts.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="text-xs font-extrabold underline"
        >
          Back to Catalog
        </button>
      </div>

      {/* Saved Products */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {savedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;