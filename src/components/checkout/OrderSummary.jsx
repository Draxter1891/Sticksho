const OrderSummary = ({ cartDetails }) => {
  return (
    <div className="top-24 space-y-5 lg:col-span-5">
      {/* Order Items Review */}
      <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sticker sticker-border">
        <h3 className="border-b-2 border-ink pb-2 font-display text-lg font-extrabold">
          Order Items ({cartDetails.totalItemsCount})
        </h3>

        <div className="max-h-60 space-y-3 overflow-y-auto pr-1">
          {cartDetails.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-ink/10 bg-sand/30 p-2.5 text-xs font-bold"
            >
              <div className="flex min-w-0 items-center gap-2">
                <img
                  src={item.images[0]}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-lg object-cover sticker-border"
                />

                <div className="min-w-0">
                  <div className="truncate font-extrabold">{item.name}</div>

                  <div className="text-[10px] text-ink/50">
                    {item.qty} × ₹{item.price}
                  </div>
                </div>
              </div>

              <span className="shrink-0 font-display text-sm font-extrabold">
                ₹{item.lineTotal}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-1.5 border-t-2 border-dashed border-ink/15 pt-3 text-xs font-bold">
          <div className="flex justify-between text-ink/70">
            <span>Subtotal</span>
            <span>₹{cartDetails.subtotal}</span>
          </div>

          <div className="flex justify-between text-ink/70">
            <span>Delivery (Delhi)</span>

            <span>
              {cartDetails.deliveryCharge === 0
                ? "FREE"
                : `₹${cartDetails.deliveryCharge}`}
            </span>
          </div>

          <div className="flex justify-between border-t border-ink/10 pt-2 text-base font-extrabold">
            <span>Final Amount</span>

            <span className="font-display text-lg">
              ₹{cartDetails.finalTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
