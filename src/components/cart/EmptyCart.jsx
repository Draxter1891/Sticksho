import { useNavigate } from "react-router";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto my-12 max-w-md rounded-3xl bg-white p-8 text-center shadow-sticker sticker-border">
      <div className="mx-auto mb-4 grid h-20 w-20 rotate-3 place-items-center rounded-full bg-lemon text-4xl sticker-border">
        🎒
      </div>

      <h2 className="mb-1 font-display text-2xl font-extrabold">
        Your bag is empty
      </h2>

      <p className="mb-6 text-xs font-medium text-ink/70">
        You haven't slapped any waterproof vinyl into your bag yet. We
        deliver all over Delhi!
      </p>

      <button
        type="button"
        onClick={() => navigate("/products")}
        className="rounded-full bg-ink px-6 py-3 text-xs font-extrabold text-white shadow-sticker transition hover:bg-lemon hover:text-ink sticker-border"
      >
        Explore Sticker Drops
      </button>
    </div>
  );
};

export default EmptyCart;