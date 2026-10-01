import { Minus, Plus } from "lucide-react";

import { useApp } from "../../context/AppContext";

const CartItem = ({ item }) => {
  const { updateCartQty, removeFromCart } = useApp();

  const handleDecrease = () => {
    updateCartQty(item.id, item.qty - 1);
  };

  const handleIncrease = () => {
    updateCartQty(item.id, item.qty + 1);
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 sticker-border shadow-sticker-sm transition hover:shadow-sticker">
      {/* Product Image */}
      <img
        src={item.images[0]}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-xl bg-sand/30 object-cover sticker-border"
      />

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] font-extrabold uppercase sticker-border">
          {item.category}
        </span>

        <h3 className="mt-1 truncate font-display text-sm font-extrabold sm:text-base">
          {item.name}
        </h3>

        <div className="mt-0.5 text-xs font-bold text-ink/60">
          ₹{item.price} each
        </div>

        {/* Quantity Controls */}
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-lg bg-sand p-0.5 shadow-sticker-inset sticker-border">
            <button
              type="button"
              onClick={handleDecrease}
              className="grid h-6 w-6 place-items-center rounded bg-white text-xs font-bold sticker-border"
              aria-label="Decrease quantity"
            >
              <Minus size={13} strokeWidth={2.5} />
            </button>

            <span className="w-8 text-center text-xs font-extrabold">
              {item.qty}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              className="grid h-6 w-6 place-items-center rounded bg-white text-xs font-bold sticker-border"
              aria-label="Increase quantity"
            >
              <Plus size={13} strokeWidth={2.5} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-xs font-bold text-coral hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Line Total */}
      <div className="text-right">
        <div className="font-display text-base font-extrabold sm:text-lg">
          ₹{item.lineTotal}
        </div>
      </div>
    </div>
  );
};

export default CartItem;