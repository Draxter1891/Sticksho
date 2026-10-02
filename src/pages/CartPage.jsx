import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";

import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

const CartPage = () => {
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

  if (cartDetails.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b-2 border-ink pb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-coral">
          DELHI DISPATCH BAG
        </span>

        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          Review Your Stickers ({cartDetails.totalItemsCount})
        </h1>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          {cartDetails.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <div className="lg:col-span-5">
          <CartSummary
            cartDetails={cartDetails}
            onProceedToCheckout={handleProceedToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;