import { useRef, useMemo } from "react";
import {
  DELHI_DISTRICTS,
  DELHI_LOCATION_DATA,
} from "../../data/delhiLocations";

const CheckoutForm = ({
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  district,

  handleDistrictChange,
  localitySearch,
  setLocalitySearch,
  selectedLocality,
  setSelectedLocality,
  isLocalityDropdownOpen,
  handleSelectLocality,
  setIsLocalityDropdownOpen,
  houseDetails,
  setHouseDetails,
  streetAreaDetails,
  setStreetAreaDetails,
  pincode,
  setPincode,
  deliveryInstructions,
  setDeliveryInstructions,
  errors,
  setErrors,
  onSubmit,
}) => {
  const localityInputRef = useRef(null);

  /*
   * Filter localities according to the selected district
   * and the user's search text.
   */
  const availableLocalities = useMemo(() => {
    if (!district || !DELHI_LOCATION_DATA[district]) {
      return [];
    }

    if (!localitySearch.trim()) {
      return DELHI_LOCATION_DATA[district];
    }

    const query = localitySearch.toLowerCase();

    return DELHI_LOCATION_DATA[district].filter((locality) =>
      locality.toLowerCase().includes(query),
    );
  }, [district, localitySearch]);

  /*
   * Progressive unlocking.
   *
   * District
   *   ↓
   * Locality
   *   ↓
   * House details
   *   ↓
   * Street / Area
   *   ↓
   * Pincode
   *   ↓
   * Delivery instructions
   */
  const isLocalityUnlocked = Boolean(district);

  const isHouseUnlocked = Boolean(district && selectedLocality);

  const isStreetUnlocked = Boolean(
    isHouseUnlocked && houseDetails.trim().length > 0,
  );

  const isPincodeUnlocked = Boolean(
    isStreetUnlocked && streetAreaDetails.trim().length > 0,
  );

  const isInstructionsUnlocked = isPincodeUnlocked;


  return (
    <div className="lg:col-span-7 rounded-3xl bg-white p-6 shadow-sticker sticker-border sm:p-8">
      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        {/*
            1. CONTACT INFORMATION
         */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-ink pb-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-lemon text-xs font-black sticker-border">
              1
            </span>

            <h2 className="font-display text-base font-extrabold">
              Contact Particulars
            </h2>
          </div>

          {/* Full Name */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              Full Name *
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);

                setErrors((prev) => ({
                  ...prev,
                  fullName: "",
                }));
              }}
              placeholder="e.g. Kabir Mehra"
              className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border focus:bg-white sm:text-sm"
            />

            {errors.fullName && (
              <p className="mt-1 text-[11px] font-bold text-coral">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Phone */}
            <div>
              <label className="mb-1 block text-xs font-extrabold">
                Mobile Phone (WhatsApp) *
              </label>

              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value.replace(/\D/g, ""));

                  setErrors((prev) => ({
                    ...prev,
                    phone: "",
                  }));
                }}
                placeholder="10-digit number"
                className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border focus:bg-white sm:text-sm"
              />

              {errors.phone && (
                <p className="mt-1 text-[11px] font-bold text-coral">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-xs font-extrabold">
                Email *
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);

                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }}
                placeholder="kabir@example.com"
                className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border focus:bg-white sm:text-sm"
              />

              {errors.email && (
                <p className="mt-1 text-[11px] font-bold text-coral">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 
            2. DELHI ADDRESS
         */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b-2 border-ink pb-2">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-lemon text-xs font-black sticker-border">
                2
              </span>

              <h2 className="font-display text-base font-extrabold">
                Delhi Delivery Location
              </h2>
            </div>

            <span className="rounded px-2 py-0.5 text-[10px] font-extrabold sticker-border bg-mint">
              OFFICIAL 13 DISTRICTS
            </span>
          </div>

          {/* State + District */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* State */}
            <div>
              <label className="mb-1 block text-xs font-extrabold">
                State / Territory
              </label>

              <input
                type="text"
                value="Delhi (NCT)"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-lemon/50 px-3.5 py-2.5 text-xs font-extrabold text-ink sticker-border sm:text-sm"
              />

              <span className="text-[10px] font-semibold text-ink/60">
                Strictly non-NCR (Delhi only)
              </span>
            </div>

            {/* District */}
            <div>
              <label className="mb-1 block text-xs font-extrabold">
                District *
              </label>

              <select
                value={district}
                onChange={handleDistrictChange}
                className="w-full cursor-pointer rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-extrabold outline-none sticker-border focus:bg-white sm:text-sm"
              >
                <option value="">-- Choose Delhi District --</option>

                {DELHI_DISTRICTS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {errors.district && (
                <p className="mt-1 text-[11px] font-bold text-coral">
                  {errors.district}
                </p>
              )}
            </div>
          </div>

          {/* 
              LOCALITY COMBOBOX
          = */}
          <div className="relative">
            <label className="mb-1 block text-xs font-extrabold">
              Locality / Sub-Division Area *
              {!isLocalityUnlocked && (
                <span className="ml-1 font-normal text-ink/40">
                  (Select district above first)
                </span>
              )}
            </label>

            <div className="relative">
              <input
                ref={localityInputRef}
                type="text"
                disabled={!isLocalityUnlocked}
                value={localitySearch}
                onChange={(event) => {
                  setLocalitySearch(event.target.value);
                  setSelectedLocality("");
                  setIsLocalityDropdownOpen(true);

                  setErrors((prev) => ({
                    ...prev,
                    locality: "",
                  }));
                }}
                onFocus={() => {
                  if (isLocalityUnlocked) {
                    setIsLocalityDropdownOpen(true);
                  }
                }}
                placeholder={
                  isLocalityUnlocked
                    ? `Search locality in ${district}...`
                    : "Choose district above to enable"
                }
                className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 pr-20 text-xs font-semibold outline-none sticker-border disabled:cursor-not-allowed disabled:bg-sand/20 focus:bg-white sm:text-sm"
              />

              {selectedLocality && (
                <span className="absolute right-3 top-2.5 text-xs font-extrabold text-mint">
                  ✓ Verified
                </span>
              )}
            </div>

            {/* Locality dropdown */}
            {isLocalityDropdownOpen && isLocalityUnlocked && (
              <div className="absolute left-0 right-0 top-full z-30 mt-1.5 max-h-48 overflow-y-auto rounded-xl bg-white p-1 shadow-sticker-lg sticker-border">
                {availableLocalities.length === 0 ? (
                  <div className="p-3 text-center text-xs font-semibold text-ink/60">
                    No official locality found in {district}.
                  </div>
                ) : (
                  availableLocalities.map((locality) => (
                    <button
                      type="button"
                      key={locality}
                      onClick={() => handleSelectLocality(locality)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-bold transition ${
                        selectedLocality === locality
                          ? "bg-lemon text-ink"
                          : "hover:bg-sand/60"
                      }`}
                    >
                      <span>{locality}</span>

                      <span className="text-[10px] text-ink/40">
                        {district}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}

            {errors.locality && (
              <p className="mt-1 text-[11px] font-bold text-coral">
                {errors.locality}
              </p>
            )}
          </div>

          {/* House / Flat */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              House / Flat / Building / Floor *
              {!isHouseUnlocked && (
                <span className="ml-1 font-normal text-ink/40">
                  (Requires Locality)
                </span>
              )}
            </label>

            <input
              type="text"
              disabled={!isHouseUnlocked}
              value={houseDetails}
              onChange={(event) => {
                setHouseDetails(event.target.value);

                setErrors((prev) => ({
                  ...prev,
                  houseDetails: "",
                }));
              }}
              placeholder="e.g. Flat 302, Tower B, Sunshine Apartments"
              className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border disabled:cursor-not-allowed disabled:bg-sand/20 focus:bg-white sm:text-sm"
            />

            {errors.houseDetails && (
              <p className="mt-1 text-[11px] font-bold text-coral">
                {errors.houseDetails}
              </p>
            )}
          </div>

          {/* Street / Area */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              Street / Area / Locality Details *
              {!isStreetUnlocked && (
                <span className="ml-1 font-normal text-ink/40">
                  (Requires House Details)
                </span>
              )}
            </label>

            <textarea
              rows={2}
              disabled={!isStreetUnlocked}
              value={streetAreaDetails}
              onChange={(event) => {
                setStreetAreaDetails(event.target.value);

                setErrors((prev) => ({
                  ...prev,
                  streetAreaDetails: "",
                }));
              }}
              placeholder="e.g. Near Mother Dairy, Block 7, Main Market Road"
              className="w-full resize-none rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border disabled:cursor-not-allowed disabled:bg-sand/20 focus:bg-white sm:text-sm"
            />

            {errors.streetAreaDetails && (
              <p className="mt-1 text-[11px] font-bold text-coral">
                {errors.streetAreaDetails}
              </p>
            )}
          </div>

          {/* Pincode + City */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Pincode */}
            <div>
              <label className="mb-1 block text-xs font-extrabold">
                Pincode (6 Digits) *
                {!isPincodeUnlocked && (
                  <span className="ml-1 font-normal text-ink/40">
                    (Unlock above)
                  </span>
                )}
              </label>

              <input
                type="text"
                maxLength={6}
                disabled={!isPincodeUnlocked}
                value={pincode}
                onChange={(event) => {
                  setPincode(event.target.value.replace(/\D/g, ""));

                  setErrors((prev) => ({
                    ...prev,
                    pincode: "",
                  }));
                }}
                placeholder="1100XX"
                className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border disabled:cursor-not-allowed disabled:bg-sand/20 focus:bg-white sm:text-sm"
              />

              {errors.pincode && (
                <p className="mt-1 text-[11px] font-bold text-coral">
                  {errors.pincode}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="mb-1 block text-xs font-extrabold">City</label>

              <input
                type="text"
                value="Delhi"
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-sand/20 px-3.5 py-2.5 text-xs font-extrabold text-ink sticker-border sm:text-sm"
              />
            </div>
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="mb-1 block text-xs font-extrabold">
              Delivery Instructions (Optional)
            </label>

            <input
              type="text"
              disabled={!isInstructionsUnlocked}
              value={deliveryInstructions}
              onChange={(event) => setDeliveryInstructions(event.target.value)}
              placeholder="e.g. Ring bell, deliver after 4 PM, call guard"
              className="w-full rounded-xl bg-sand/40 px-3.5 py-2.5 text-xs font-semibold outline-none sticker-border disabled:cursor-not-allowed disabled:bg-sand/20 focus:bg-white sm:text-sm"
            />
          </div>
        </div>

        {/* 
            SUBMIT
        = */}
        <div className="border-t-2 border-ink pt-4">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-4 py-4 text-base font-extrabold text-white shadow-sticker sticker-border transition hover:-translate-y-0.5 hover:bg-[#20ba5a] sm:text-lg"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19.05 4.94A9.91 9.91 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 10.91c0 1.57.41 3.1 1.19 4.45L2 22l6.82-1.79a9.87 9.87 0 0 0 4.72 1.2h.02c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01l-.02-.45ZM12.06 19.6h-.02a8.03 8.03 0 0 1-4.1-1.12l-.3-.18-4.05 1.06 1.08-3.95-.2-.4a8.1 8.1 0 0 1-1.24-4.1c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.85 5.74 2.39a8.06 8.06 0 0 1 2.39 5.74c0 4.48-3.65 8.14-8.14 8.14l.6-.45Z" />
            </svg>

            <span>Place Order on WhatsApp</span>
          </button>

          <p className="mt-2 text-center text-[11px] font-medium text-ink/60">
            Clicking opens WhatsApp chat with <strong>9650727640</strong> with
            your order pre-populated.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
