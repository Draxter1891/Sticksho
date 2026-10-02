const AddressPreview = ({
  fullName,
  phone,
  email,
  houseDetails,
  streetAreaDetails,
  selectedLocality,
  district,
  pincode,
  deliveryInstructions,
}) => {
  return (
    <div className="space-y-3 rounded-3xl bg-sand/60 p-6 shadow-sticker sticker-border">
      <div className="flex items-center justify-between">
        <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-ink/60">
          Destination Preview
        </h4>

        <span className="rounded bg-lemon px-2 py-0.5 text-[10px] font-extrabold sticker-border">
          DELHI NCR EXCLUSIVE
        </span>
      </div>

      <div className="space-y-1 rounded-2xl bg-white p-4 text-xs font-medium shadow-sticker-sm sticker-border">
        <div className="mb-1 text-sm font-extrabold text-ink">
          {fullName || "Recipient Name"}
        </div>

        <div className="text-ink/80">
          {phone || "10-digit Phone"} • {email || "Email"}
        </div>

        <div className="pt-1 text-ink/90">
          {houseDetails ? `${houseDetails}, ` : "House/Flat, "}
          {streetAreaDetails
            ? `${streetAreaDetails}, `
            : "Street/Area, "}
        </div>

        <div className="font-bold text-ink">
          {selectedLocality || "Locality"},{" "}
          {district || "District"}, Delhi{" "}
          {pincode ? `- ${pincode}` : ""}
        </div>

        {deliveryInstructions && (
          <div className="pt-1 text-[11px] font-bold italic text-coral">
            Note: {deliveryInstructions}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressPreview;