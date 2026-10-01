const LOGO_URL =
  "https://res.cloudinary.com/dwl1mgrt4/image/upload/v1789217426/pgnLOGO_y55hoh.png";

const OtakunLogo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={LOGO_URL}
        alt="STICKSHO"
        className="h-10 w-auto object-contain"
      />

      <span className="sticker-border rounded-full bg-lemon px-2 py-0.5 font-display text-[9px] font-extrabold uppercase leading-none">
        DELHI ONLY
      </span>
    </div>
  );
};

export default OtakunLogo;