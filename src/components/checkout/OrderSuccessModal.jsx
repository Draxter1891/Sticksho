const OrderSuccessModal = ({
  isOpen,
  generatedMessageText,
  generatedWaUrl,
  onClose,
  onDone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm">
      <div className="animate-wiggle w-full max-w-lg space-y-5 rounded-3xl bg-white p-6 shadow-sticker-lg sticker-border-thick sm:p-8">
        {/* Success Icon */}
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-3xl text-white shadow-sticker-sm sticker-border">
          ✓
        </div>

        {/* Heading */}
        <div className="space-y-1 text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Dispatch Window Opened!
          </h2>

          <p className="mx-auto max-w-sm text-xs font-medium text-ink/70">
            Your pre-formatted message was sent to WhatsApp. Press{" "}
            <strong>"Send"</strong> in WhatsApp to lock in your order
            with our Delhi pack crew.
          </p>
        </div>

        {/* WhatsApp Message Preview */}
        <div className="max-h-48 overflow-y-auto rounded-2xl bg-sand/50 p-4 text-left sticker-border">
          <div className="mb-1 text-[10px] font-extrabold uppercase text-ink/50">
            Populated WhatsApp Message
          </div>

          <pre className="whitespace-pre-wrap font-mono text-[11px] font-medium text-ink/90">
            {generatedMessageText}
          </pre>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <a
            href={generatedWaUrl}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-xl bg-[#25D366] py-3 text-center text-xs font-extrabold text-white shadow-sticker-sm transition hover:-translate-y-0.5 sticker-border"
          >
            Open WhatsApp Again (Chat: 9650727640)
          </a>

          <button
            type="button"
            onClick={onDone}
            className="block w-full rounded-xl bg-sand py-2.5 text-center text-xs font-extrabold text-ink transition hover:bg-sand/80 sticker-border"
          >
            Done! Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;