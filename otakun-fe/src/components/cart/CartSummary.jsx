import { useNavigate } from "react-router";

import { useApp } from "../../context/AppContext";

const CartSummary = () => {
  const navigate = useNavigate();

  const {
    cartDetails,
    user,
    setIsAuthOpen,
    setAuthIntent,
  } = useApp();

  const handleProceedToCheckout = () => {
    if (!user) {
      setAuthIntent("checkout");
      setIsAuthOpen(true);
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="sticky top-24 space-y-5 rounded-3xl bg-white p-6 shadow-sticker sticker-border">
      <h2 className="border-b-2 border-ink pb-3 font-display text-xl font-extrabold">
        Order Breakdown
      </h2>

      <div className="space-y-3 text-xs font-bold sm:text-sm">
        {/* Subtotal */}
        <div className="flex justify-between text-ink/70">
          <span>Packs Subtotal</span>

          <span className="text-ink">
            ₹{cartDetails.subtotal}
          </span>
        </div>

        {/* Delivery */}
        <div className="flex justify-between text-ink/70">
          <span className="flex items-center gap-1">
            Delhi Courier Charge

            {cartDetails.subtotal >= 500 && (
              <span className="rounded border border-ink bg-mint px-1.5 py-0.5 text-[10px] font-extrabold text-ink">
                FREE
              </span>
            )}
          </span>

          <span className="text-ink">
            {cartDetails.deliveryCharge === 0
              ? "FREE"
              : `₹${cartDetails.deliveryCharge}`}
          </span>
        </div>

        {/* Free delivery progress */}
        {cartDetails.subtotal < 500 && (
          <div className="rounded-xl bg-sand/50 p-2.5 text-[11px] font-semibold text-ink/70 sticker-border">
            Add ₹{500 - cartDetails.subtotal} more stickers to unlock{" "}
            <strong>FREE Delhi Delivery</strong>!
          </div>
        )}

        {/* Grand Total */}
        <div className="flex justify-between border-t-2 border-dashed border-ink/20 pt-3 text-base font-extrabold sm:text-lg">
          <span>Grand Total</span>

          <span className="font-display text-xl text-ink">
            ₹{cartDetails.finalTotal}
          </span>
        </div>
      </div>

      {/* Checkout */}
      <button
        type="button"
        onClick={handleProceedToCheckout}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lemon px-4 py-3.5 font-display text-sm font-extrabold text-ink shadow-sticker transition hover:-translate-y-0.5 hover:bg-lemon/90 sm:text-base sticker-border"
      >
        <span>Continue to Delhi Address</span>
        <span>→</span>
      </button>

      {/* Checkout information */}
      <div className="space-y-2 border-t border-ink/10 pt-2 text-[11px] font-medium text-ink/60">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-mint">✓</span>
          <span>
            No card, UPI pin, or online transaction required now
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-extrabold text-mint">✓</span>
          <span>
            Final confirmation via WhatsApp click-to-chat
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-extrabold text-mint">✓</span>
          <span>
            Strictly limited to the 13 Revenue Districts of Delhi
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;