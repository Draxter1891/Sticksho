import { ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

import OtakunLogo from "./OtakunLogo";

const Footer = () => {
  const navigate = useNavigate();

  const categories = [
    "Anime",
    "Cartoons",
    "Gaming",
    "Kawaii / Cute",
    "Memes / Funny",
    "Original Art",
  ];

  const handleCategoryClick = (category) => {
    navigate(
      `/products?category=${encodeURIComponent(category)}`,
    );
  };

  return (
    <footer className="mt-20 border-t-2 border-ink bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="space-y-3 md:col-span-1">
            <OtakunLogo />

            <p className="text-xs font-medium leading-relaxed text-ink/70">
              Independent sticker press in Shahdara, New Delhi.
              Small batches, weatherproof vinyl, and zero boring
              surfaces.
            </p>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-ink bg-lemon px-2.5 py-1 text-[11px] font-extrabold shadow-sticker-sm">
              <span className="h-2 w-2 animate-ping rounded-full bg-coral" />
              DELHI ORDERS VIA WHATSAPP
            </div>
          </div>

          {/* Column 2 — Categories */}
          <div>
            <h4 className="mb-3 font-display text-sm font-extrabold">
              Explore Categories
            </h4>

            <ul className="space-y-2 text-xs font-semibold text-ink/80">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() =>
                      handleCategoryClick(category)
                    }
                    className="flex items-center gap-1 transition hover:text-coral hover:underline"
                  >
                    <ArrowRight size={12} strokeWidth={2.5} />
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Shipping & Policy */}
          <div>
            <h4 className="mb-3 font-display text-sm font-extrabold">
              Delhi Shipping & Policy
            </h4>

            <div className="space-y-2 text-xs font-medium text-ink/70">
              <p>
                🛵{" "}
                <strong className="text-ink">
                  Delivery Area:
                </strong>{" "}
                All 13 official Delhi Revenue Districts.
              </p>

              <p>
                ⚡{" "}
                <strong className="text-ink">
                  Speed:
                </strong>{" "}
                24–48 hours across Central, South, North, &
                West Delhi.
              </p>

              <p>
                📦{" "}
                <strong className="text-ink">
                  Free Shipping:
                </strong>{" "}
                On all orders above ₹500.
              </p>

              <p>
                💬{" "}
                <strong className="text-ink">
                  Payment:
                </strong>{" "}
                WhatsApp confirmed COD / Direct UPI upon
                confirmation.
              </p>
            </div>
          </div>

          {/* Column 4 — WhatsApp */}
          <div>
            <h4 className="mb-3 font-display text-sm font-extrabold">
              Talk to the Studio
            </h4>

            <p className="mb-3 text-xs text-ink/70">
              Custom batch orders, laptop slappings, or collabs
              with Delhi creators:
            </p>

            <a
              href="https://wa.me/919650727640?text=Hi%20STICKSHO%20Studio!%20I%20have%20a%20question%20about%20stickers"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-ink bg-[#25D366] px-3.5 py-2 text-xs font-extrabold text-white shadow-sticker-sm transition hover:-translate-y-0.5"
            >
              <MessageCircle
                size={16}
                strokeWidth={2.5}
              />

              WhatsApp: 9650727640
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-ink/10 pt-6 text-[11px] font-semibold text-ink/60 sm:flex-row">
          <div>
            © {new Date().getFullYear()} STICKSHO Delhi.
            Hand-packed with love. No payment gateway hassle.
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <span>100% Waterproof Vinyl</span>
            <span>•</span>
            <span>UV-Laminated</span>
            <span>•</span>
            <span>Easy Residue-Free Peel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;