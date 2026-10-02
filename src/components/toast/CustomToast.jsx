import { toast } from "react-hot-toast";

const CustomToast = ({ toastId, message, type = "success" }) => {
  const isInfo = type === "info";

  return (
    <div
      className={`
        toast-anim
        pointer-events-auto
        flex
        items-center
        gap-2.5
        px-4
        py-2.5
        rounded-2xl
        sticker-border
        shadow-sticker
        font-display
        font-extrabold
        text-xs
        sm:text-sm
        ${
          isInfo
            ? "bg-sand text-ink"
            : "bg-lemon text-ink"
        }
      `}
    >
      <span>{isInfo ? "ℹ️" : "💥"}</span>

      <span>{message}</span>

      <button
        type="button"
        onClick={() => toast.dismiss(toastId)}
        className="ml-1 text-sm opacity-50 transition-opacity hover:opacity-100"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default CustomToast;