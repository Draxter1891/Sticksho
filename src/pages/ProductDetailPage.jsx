import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";

import { PRODUCTS } from "../data/products";

const ProductDetailPage = () => {
  const { id } = useLoaderData();
  const navigate = useNavigate();

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const product = PRODUCTS.find(
    (item) => item.id === Number(id),
  );

  // Product doesn't exist
  if (!product) {
    return (
      <div className="mx-auto my-16 max-w-md rounded-3xl bg-white p-8 text-center shadow-sticker sticker-border">
        <div className="mb-3 text-4xl">🫠</div>

        <h2 className="mb-2 font-display text-2xl font-extrabold">
          Sticker Not Found
        </h2>

        <p className="mb-5 text-xs text-ink/70">
          This pack might have been peeled away or retired from the
          Delhi catalogue.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="rounded-full bg-ink px-6 py-2.5 text-xs font-extrabold text-white sticker-border"
        >
          Back to All Stickers
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      {/*
          BREADCRUMBS
      */}
      <div className="flex items-center gap-2 text-xs font-bold text-ink/60">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="hover:underline"
        >
          Home
        </button>

        <span>/</span>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="hover:underline"
        >
          All Stickers
        </button>

        <span>/</span>

        <span className="max-w-xs truncate text-ink">
          {product.name}
        </span>
      </div>

      {/*
          MAIN DETAIL CARD
      */}
      <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sticker sticker-border-thick sm:p-10 lg:grid-cols-12 lg:gap-12">
        {/* Gallery */}
        <ProductGallery
          product={product}
          selectedImageIdx={selectedImageIdx}
          setSelectedImageIdx={setSelectedImageIdx}
        />

        {/* Product Information */}
        <ProductInfo product={product} />
      </div>

      {/*
          CUSTOMER REVIEWS
      */}
      <section className="space-y-6 rounded-3xl bg-white p-6 shadow-sticker sticker-border sm:p-8">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <h2 className="font-display text-xl font-extrabold sm:text-2xl">
            Recent Delhi Customer Reviews
          </h2>

          <span className="hidden rounded-full bg-mint px-3 py-1 text-xs font-bold sm:inline-block sticker-border">
            100% Verified Vinyl Slappers
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Review 1 */}
          <div className="space-y-2 rounded-2xl bg-sand/30 p-4 sticker-border">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold">
                Aarav K. • Lajpat Nagar
              </span>

              <span className="whitespace-nowrap text-xs font-black text-amber-500">
                ★★★★★
              </span>
            </div>

            <p className="text-xs font-medium leading-relaxed text-ink/80">
              "Slapped the whole pack onto my ThinkPad and Nalgene.
              Survived heavy Delhi metro rain without peeling at all.
              Matte finish is elite."
            </p>
          </div>

          {/* Review 2 */}
          <div className="space-y-2 rounded-2xl bg-sand/30 p-4 sticker-border">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold">
                Pooja M. • Rohini Sec 14
              </span>

              <span className="whitespace-nowrap text-xs font-black text-amber-500">
                ★★★★★
              </span>
            </div>

            <p className="text-xs font-medium leading-relaxed text-ink/80">
              "Ordered via WhatsApp in the morning, got delivery the
              next evening. Super responsive team and no online payment
              mess."
            </p>
          </div>

          {/* Review 3 */}
          <div className="space-y-2 rounded-2xl bg-sand/30 p-4 sticker-border">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold">
                Devansh S. • Hauz Khas
              </span>

              <span className="whitespace-nowrap text-xs font-black text-amber-500">
                ★★★★★
              </span>
            </div>

            <p className="text-xs font-medium leading-relaxed text-ink/80">
              "Colors are super saturated and cut lines are crisp.
              Doesn't leave sticky glue when you peel it off to swap
              with a new drop."
            </p>
          </div>
        </div>
      </section>

      {/*
          RELATED PRODUCTS
      */}
      <RelatedProducts
        product={product}
        products={PRODUCTS}
      />
    </div>
  );
};

export default ProductDetailPage;