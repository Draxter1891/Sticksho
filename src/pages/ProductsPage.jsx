import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router";

import ProductCard from "../components/product/ProductCard";
import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = useMemo(() => {
    const category = searchParams.get("category");

    return category && CATEGORIES.includes(category)
      ? category
      : "All";
  }, [searchParams]);

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  /*
   * Keep category state synchronized with the URL.
   *
   * Example:
   * /products?category=Anime
   */
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }

    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (selectedCategory !== "All") {
      list = list.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.desc.toLowerCase().includes(query) ||
          (product.badge &&
            product.badge.toLowerCase().includes(query)),
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");

    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* =========================
          HEADER & CONTROLS
      ========================== */}
      <div className="rounded-3xl bg-white p-5 shadow-sticker sticker-border sm:p-7">
        <div className="flex flex-col justify-between gap-4 border-b-2 border-ink pb-5 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-coral">
              STICKER DROP DIRECTORY
            </span>

            <h1 className="flex items-center gap-2 font-display text-3xl font-extrabold sm:text-4xl">
              All Packs

              <span className="rounded-full bg-sand px-2.5 py-0.5 text-sm font-bold text-ink/50 sticker-border">
                {filteredProducts.length} results
              </span>
            </h1>
          </div>

          {/* Search + Sort */}
          <div className="flex w-full max-w-md flex-1 flex-col gap-2.5 sm:flex-row md:justify-end">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search Anime, memes, kawaii, holo..."
                className="w-full rounded-full bg-sand/50 py-2 pl-9 pr-9 text-xs font-semibold outline-none transition focus:bg-white focus:shadow-sticker-sm sm:text-sm sticker-border"
              />

              <Search
                size={16}
                strokeWidth={2.5}
                className="absolute left-3 top-2.5 text-ink/60"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-ink/40 transition hover:text-ink"
                  aria-label="Clear search"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-bold outline-none shadow-sticker-sm sm:text-sm sticker-border"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold shadow-sticker-sm transition sticker-border ${
                  isSelected
                    ? "bg-ink text-white"
                    : "bg-white text-ink hover:bg-lemon"
                }`}
              >
                {category}

                {category === "All"
                  ? ` (${PRODUCTS.length})`
                  : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================
          PRODUCTS / EMPTY STATE
      ========================== */}
      {filteredProducts.length === 0 ? (
        <div className="mx-auto my-8 max-w-xl rounded-3xl bg-white p-12 text-center shadow-sticker sticker-border">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-sand text-3xl sticker-border">
            👀
          </div>

          <h2 className="mb-1 font-display text-2xl font-extrabold">
            No stickers matched your radar
          </h2>

          <p className="mb-6 text-xs font-medium text-ink/60">
            Try searching for broader keywords like "Anime",
            "Cat", "Foil", or clear your category filter.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-full bg-lemon px-6 py-2.5 text-xs font-extrabold text-ink shadow-sticker-sm transition hover:bg-lemon/90 sticker-border"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;