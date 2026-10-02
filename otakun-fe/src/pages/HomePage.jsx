import { useMemo } from "react";
import { useNavigate } from "react-router";

import ProductCard from "../components/product/ProductCard";
import { PRODUCTS } from "../data/products";
import { CATEGORIES, CATEGORY_META } from "../data/categories";

const HomePage = () => {
  const navigate = useNavigate();

  const featuredProducts = useMemo(() => {
    return PRODUCTS.slice(0, 4);
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* 
          HERO SECTION
       */}
      <section className="relative mt-4 sm:mt-6">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Left Hero Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-sticker sticker-border-thick sm:p-10 lg:col-span-7">
            {/* Hero badges */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rotate-[-1.5deg] rounded-full bg-mint px-3 py-1 text-xs font-extrabold tracking-wide shadow-sticker-sm sticker-border">
                ⚡ DROP 04 LIVE IN DELHI
              </span>

              <span className="rotate-2 rounded-full bg-lemon px-3 py-1 text-xs font-extrabold tracking-wide shadow-sticker-sm sticker-border">
                🛵 24-48 HR METRO DELIVERY
              </span>

              <span className="hidden rounded-full bg-lilac px-3 py-1 text-xs font-extrabold tracking-wide shadow-sticker-sm sticker-border sm:inline-block">
                ☕ 100% WATERPROOF
              </span>
            </div>

            <div className="my-2 space-y-4">
              <h1 className="font-display text-4xl font-extrabold leading-[0.92] tracking-tight sm:text-6xl lg:text-[68px]">
                STICKERS
                <br />
                <span className="mt-1 inline-block -rotate-1 rounded-xl border-2 border-ink bg-lemon px-3 py-0.5 shadow-sticker-sm">
                  THAT STICK
                </span>
                <br />
                WITH YOU.
              </h1>

              <p className="max-w-xl text-sm font-medium leading-relaxed text-ink/80 sm:text-base">
                Designed for chaotic laptops, stainless gym bottles, scooters,
                and metro diaries. Heavy-duty laminated vinyl hand-packed in
                North East Delhi. No payment gateway fuss - browse, build your
                pack, and order straight to WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t-2 border-dashed border-ink/15 pt-6">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="group flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-extrabold text-white shadow-sticker transition hover:-translate-y-0.5 hover:bg-lemon hover:text-ink sm:text-base sticker-border"
              >
                <span>Browse All Stickers</span>

                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs text-ink transition group-hover:bg-ink group-hover:text-white">
                  →
                </span>
              </button>

              <div className="flex items-center gap-3 rounded-full bg-sand/60 px-4 py-2 sticker-border">
                <div className="flex -space-x-2">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-lemon text-xs font-bold sticker-border">
                    ⚡
                  </div>

                  <div className="grid h-7 w-7 place-items-center rounded-full bg-coral text-xs font-bold text-white sticker-border">
                    ❤️
                  </div>

                  <div className="grid h-7 w-7 place-items-center rounded-full bg-mint text-xs font-bold sticker-border">
                    ✨
                  </div>
                </div>

                <div className="text-xs leading-none">
                  <div className="font-extrabold">1150+ Slapped</div>
                  <div className="text-[10px] text-ink/60">in Delhi NCR</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-lemon p-6 shadow-sticker sticker-border-thick lg:col-span-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold shadow-sticker-sm sticker-border">
                ★ OTAKUN STUDIO
              </span>

              <span className="-rotate-3 rounded-full bg-coral px-3 py-1 text-xs font-extrabold text-white shadow-sticker-sm sticker-border">
                ₹149 - ₹349
              </span>
            </div>

            {/* Sticker mockups */}
            <div className="my-6 grid grid-cols-2 gap-3.5">
              <div className="-rotate-2 rounded-2xl bg-white p-3 shadow-sticker-sm transition hover:rotate-0 sticker-border">
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80"
                  className="h-32 w-full rounded-xl border border-ink/10 object-cover sm:h-36"
                  alt="Anime pack"
                />

                <div className="mt-2 font-display text-xs font-extrabold">
                  Shinobi Legends
                </div>

                <div className="text-[10px] font-bold text-ink/60">
                  12 pcs • Matte Vinyl
                </div>
              </div>

              <div className="rotate-3 rounded-2xl bg-white p-3 shadow-sticker-sm transition hover:rotate-0 sticker-border">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80"
                  className="h-32 w-full rounded-xl border border-ink/10 object-cover sm:h-36"
                  alt="Gaming holo pack"
                />

                <div className="mt-2 font-display text-xs font-extrabold">
                  Elden Bosses
                </div>

                <div className="text-[10px] font-bold text-ink/60">
                  7 pcs • Holo Prism
                </div>
              </div>
            </div>

            {/* WhatsApp ordering banner */}
            <div className="rounded-2xl bg-white p-4 shadow-sticker-sm sticker-border">
              <div className="mb-1 flex items-center justify-between text-xs font-extrabold">
                <span className="flex items-center gap-1.5 text-ink">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#25D366]" />
                  Direct WhatsApp Ordering
                </span>

                <span className="text-coral">Zero Gateway Fees</span>
              </div>

              <p className="text-[11px] font-medium leading-snug text-ink/70">
                Confirm your address with our human team in Delhi. We prep your
                order within 3 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
          CATEGORY EXPLORATION
       */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-2 border-b-2 border-ink pb-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-ink/60">
              VIBE RADAR
            </span>

            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Shop by Sticker Category
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="flex items-center gap-1 text-xs font-extrabold hover:underline"
          >
            View all collection <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.filter((category) => category !== "All").map(
            (categoryName) => {
              const meta = CATEGORY_META[categoryName] || {
                color: "#FFE814",
                bannerURL:
                  "https://ik.imagekit.io/wvhxclxrt/OtakunCategoryBanner/tr:q-10,f-auto/default.png",
                desc: "Curated",
              };

              const count = PRODUCTS.filter(
                (product) => product.category === categoryName,
              ).length;

              return (
                <button
                  key={categoryName}
                  type="button"
                  onClick={() =>
                    navigate(
                      `/products?category=${encodeURIComponent(categoryName)}`,
                    )
                  }
                  className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl bg-white text-left shadow-sticker-sm transition hover:-translate-y-1 hover:shadow-sticker sm:h-40 sticker-border"
                  style={{
                    background: `radial-gradient(180px 140px at 90% 10%, ${meta.color}55 0%, #FFFFFF 85%)`,
                  }}
                >
                  <div className="relative flex items-start justify-between">
                    <img
                      className="absolute left-0 w-full transition-transform group-hover:scale-110"
                      src={meta.bannerURL}
                      alt={categoryName}
                    />

                    <span className="absolute top-2 rounded-full bg-sand px-2 py-0.5 text-[10px] font-extrabold sticker-border">
                      {count} {count === 1 ? "pack" : "packs"}
                    </span>
                  </div>

                  <h3 className="absolute right-2 top-2 rounded-2xl bg-gray-100 px-2 font-display text-sm font-extrabold leading-tight transition group-hover:text-coral sm:text-base">
                    {categoryName}
                  </h3>

                  <p className="absolute bottom-2 mt-0.5 line-clamp-1 rounded-xl bg-gray-50 px-2 text-[10px] font-medium text-ink sm:text-[11px]">
                    {meta.desc}
                  </p>
                </button>
              );
            },
          )}
        </div>
      </section>

      {/* 
          FEATURED DROPS
       */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-coral">
              HIGH DEMAND
            </span>

            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Featured Drops
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="hidden rounded-full bg-white px-4 py-1.5 text-xs font-extrabold shadow-sticker-sm transition hover:bg-lemon sm:inline-flex sticker-border"
          >
            See All Stickers ({PRODUCTS.length})
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 
          QUALITY PROOF
       */}
      <section className="rounded-3xl bg-sand/60 p-6 shadow-sticker sticker-border-thick sm:p-10">
        <div className="mb-8 max-w-3xl">
          <span className="mb-3 inline-block rounded-full bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-lemon">
            BUILT DIFFERENT
          </span>

          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Stickers engineered for Delhi&apos;s extreme heat, rain & commute.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sticker-sm sticker-border">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-lemon text-lg sticker-border">
              🌧️
            </div>

            <h3 className="mb-1 font-display text-base font-extrabold">
              100% Dishwasher & Water Safe
            </h3>

            <p className="text-xs font-medium leading-relaxed text-ink/70">
              Submerge your bottle, cycle in the monsoon, or wash your travel
              mug daily. The ink never bleeds.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sticker-sm sticker-border">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-mint text-lg sticker-border">
              🛡️
            </div>

            <h3 className="mb-1 font-display text-base font-extrabold">
              Heavy-Duty Matte Shield
            </h3>

            <p className="text-xs font-medium leading-relaxed text-ink/70">
              Scratch-resistant lamination repels keys, backpack scuffs, and
              fingerprints. Crisp colors for years.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sticker-sm sticker-border">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-lilac text-lg sticker-border">
              🔄
            </div>

            <h3 className="mb-1 font-display text-base font-extrabold">
              Zero Nasty Gunk / Residue
            </h3>

            <p className="text-xs font-medium leading-relaxed text-ink/70">
              Change laptops or reorganise your collage anytime. Our adhesive
              peels off clean without sticky mess.
            </p>
          </div>
        </div>
      </section>

      {/* 
          BEHIND THE BRAND
       */}
      <section className="grid items-center gap-8 rounded-3xl bg-white p-6 shadow-sticker sticker-border sm:p-10 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-coral">
            BEHIND THE BRAND
          </span>

          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Born in a North-East Delhi room. Made for your everyday gear.
          </h2>

          <p className="text-sm font-medium leading-relaxed text-ink/80">
            OTAKUN started with a single silhouette vinyl cutter and an
            obsession with quality illustration. Instead of flimsy paper labels
            that peel off after two days, we formulate vinyl specifically for
            people who carry their laptops everywhere, from yellow line metro
            trains to midnight library shifts.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl bg-sand/40 p-3 sticker-border">
              <div className="font-display text-xl font-extrabold sm:text-2xl">
                13 Districts
              </div>

              <div className="text-xs font-semibold text-ink/60">
                Delhi local dispatch only
              </div>
            </div>

            <div className="rounded-xl bg-sand/40 p-3 sticker-border">
              <div className="font-display text-xl font-extrabold sm:text-2xl">
                0% Fees
              </div>

              <div className="text-xs font-semibold text-ink/60">
                Direct WhatsApp ordering
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl bg-lemon p-3 shadow-sticker sticker-border">
            <img
              src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=800&q=80"
              alt="Sticker creation studio"
              className="h-72 w-full rounded-xl object-cover sm:h-80 sticker-border"
            />

            <div className="absolute -bottom-3 -right-3 rotate-2 rounded-xl bg-white px-4 py-2 font-display text-xs font-extrabold shadow-sticker sticker-border">
              Shahdara, New Delhi
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
