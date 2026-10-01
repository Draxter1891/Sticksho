import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { useApp } from "../context/AppContext";
import { DELHI_DISTRICTS, DELHI_LOCATION_DATA } from "../data/delhiLocations";

import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import AddressPreview from "../components/checkout/AddressPreview";
import OrderSuccessModal from "../components/checkout/OrderSuccessModal";

const CheckoutPage = () => {
  const { cartDetails, user, clearCart } = useApp();
  const navigate = useNavigate();

  // --------------------------------------------------
  // Guard: redirect if cart is empty
  // --------------------------------------------------

  useEffect(() => {
    if (cartDetails.items.length === 0) {
      navigate("/cart");
    }
  }, [cartDetails.items, navigate]);

  // --------------------------------------------------
  // Form state
  // --------------------------------------------------

  const [fullName, setFullName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState(user ? user.phone : "");
  const [email, setEmail] = useState(user ? user.email : "");

  const [district, setDistrict] = useState("");
  const [localitySearch, setLocalitySearch] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [isLocalityDropdownOpen, setIsLocalityDropdownOpen] =
    useState(false);

  const [houseDetails, setHouseDetails] = useState("");
  const [streetAreaDetails, setStreetAreaDetails] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // --------------------------------------------------
  // Validation + success modal state
  // --------------------------------------------------

  const [errors, setErrors] = useState({});

  const [isSubmittedModalOpen, setIsSubmittedModalOpen] =
    useState(false);

  const [generatedWaUrl, setGeneratedWaUrl] = useState("");
  const [generatedMessageText, setGeneratedMessageText] =
    useState("");

  const localityInputRef = useRef(null);

  // --------------------------------------------------
  // Locality filtering
  // --------------------------------------------------

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

  // --------------------------------------------------
  // District change
  // --------------------------------------------------

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;

    setDistrict(newDistrict);
    setSelectedLocality("");
    setLocalitySearch("");
    setIsLocalityDropdownOpen(false);

    setErrors((prev) => ({
      ...prev,
      district: "",
      locality: "",
    }));
  };

  // --------------------------------------------------
  // Locality selection
  // --------------------------------------------------

  const handleSelectLocality = (locality) => {
    setSelectedLocality(locality);
    setLocalitySearch(locality);
    setIsLocalityDropdownOpen(false);

    setErrors((prev) => ({
      ...prev,
      locality: "",
    }));
  };

  // --------------------------------------------------
  // Progressive unlocking
  // --------------------------------------------------

  const isLocalityUnlocked = Boolean(district);

  const isHouseUnlocked = Boolean(
    district && selectedLocality,
  );

  const isStreetUnlocked = Boolean(
    isHouseUnlocked && houseDetails.trim().length > 0,
  );

  const isPincodeUnlocked = Boolean(
    isStreetUnlocked && streetAreaDetails.trim().length > 0,
  );

  const isInstructionsUnlocked = isPincodeUnlocked;

  // --------------------------------------------------
  // Validation
  // --------------------------------------------------

  const validate = () => {
    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Please enter your full name";
    }

    if (
      !phone.trim() ||
      !/^[6-9]\d{9}$/.test(phone.trim())
    ) {
      validationErrors.phone =
        "Enter a valid 10-digit Delhi mobile number (starts with 6-9)";
    }

    if (
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      validationErrors.email =
        "Enter a valid email for dispatch updates";
    }

    if (!district) {
      validationErrors.district =
        "Select an official Delhi Revenue District";
    }

    if (
      !selectedLocality ||
      !DELHI_LOCATION_DATA[district]?.includes(selectedLocality)
    ) {
      validationErrors.locality =
        "Select a verified Delhi area from the dropdown options";
    }

    if (!houseDetails.trim()) {
      validationErrors.houseDetails =
        "Provide your House / Flat / Building / Floor";
    }

    if (!streetAreaDetails.trim()) {
      validationErrors.streetAreaDetails =
        "Provide street, block, colony, or landmark";
    }

    if (
      !pincode.trim() ||
      !/^\d{6}$/.test(pincode.trim())
    ) {
      validationErrors.pincode =
        "Enter a valid 6-digit Delhi Pincode (e.g. 110001)";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // --------------------------------------------------
  // Generate WhatsApp order
  // --------------------------------------------------

  const handlePlaceOrderWhatsApp = (e) => {
    e.preventDefault();

    if (!validate()) {
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });

      return;
    }

    const itemsList = cartDetails.items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} × ${item.qty} — ₹${item.lineTotal}`,
      )
      .join("\n");

    const messageLines = [
      "STICKSHO ORDER",
      "",

      "Customer Details",
      `Name: ${fullName.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim()}`,
      "",

      "Delivery Address",
      `House: ${houseDetails.trim()}`,
      `Street/Area: ${streetAreaDetails.trim()}`,
      `Locality: ${selectedLocality}`,
      `District: ${district}`,
      "City: Delhi",
      "State: Delhi",
      `Pincode: ${pincode.trim()}`,
    ];

    if (deliveryInstructions.trim()) {
      messageLines.push(
        `Instructions: ${deliveryInstructions.trim()}`,
      );
    }

    messageLines.push(
      "",
      "Order Items",
      itemsList,
      "",
      `Subtotal: ₹${cartDetails.subtotal}`,
      `Delivery: ${
        cartDetails.deliveryCharge === 0
          ? "FREE"
          : `₹${cartDetails.deliveryCharge}`
      }`,
      `Total: ₹${cartDetails.finalTotal}`,
      "",
      "Please confirm my order.",
    );

    const fullMessage = messageLines.join("\n");

    const encodedMessage = encodeURIComponent(fullMessage);

    const waUrl = `https://wa.me/919650727640?text=${encodedMessage}`;

    setGeneratedMessageText(fullMessage);
    setGeneratedWaUrl(waUrl);
    setIsSubmittedModalOpen(true);

    // Preserve original behavior:
    // open WhatsApp immediately after successful validation.
    window.open(waUrl, "_blank");
  };

  // --------------------------------------------------
  // Done after WhatsApp flow
  // --------------------------------------------------

  const handleOrderDone = () => {
    setIsSubmittedModalOpen(false);
    clearCart();
    navigate("/");
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div className="border-b-2 border-ink pb-4">
        <span className="rounded bg-ink px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-mint">
          DELHI REVENUE JURISDICTION ONLY
        </span>

        <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
          Delhi Express Checkout
        </h1>

        <p className="text-xs font-medium text-ink/70 sm:text-sm">
          We deliver exclusively within the 13 official districts of
          Delhi. Orders outside Delhi territory cannot be processed.
        </p>
      </div>

      {/* Checkout Layout */}
      <div className="grid items-start gap-8 lg:grid-cols-12">
        {/* Left: Checkout Form */}
        <CheckoutForm
          fullName={fullName}
          setFullName={setFullName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          district={district}
          handleDistrictChange={handleDistrictChange}
          delhiDistricts={DELHI_DISTRICTS}
          localitySearch={localitySearch}
          setLocalitySearch={setLocalitySearch}
          selectedLocality={selectedLocality}
          handleSelectLocality={handleSelectLocality}
          availableLocalities={availableLocalities}
          isLocalityDropdownOpen={isLocalityDropdownOpen}
          setIsLocalityDropdownOpen={setIsLocalityDropdownOpen}
          localityInputRef={localityInputRef}
          houseDetails={houseDetails}
          setHouseDetails={setHouseDetails}
          streetAreaDetails={streetAreaDetails}
          setStreetAreaDetails={setStreetAreaDetails}
          pincode={pincode}
          setPincode={setPincode}
          deliveryInstructions={deliveryInstructions}
          setDeliveryInstructions={setDeliveryInstructions}
          errors={errors}
          setErrors={setErrors}
          isLocalityUnlocked={isLocalityUnlocked}
          isHouseUnlocked={isHouseUnlocked}
          isStreetUnlocked={isStreetUnlocked}
          isPincodeUnlocked={isPincodeUnlocked}
          isInstructionsUnlocked={isInstructionsUnlocked}
          onSubmit={handlePlaceOrderWhatsApp}
        />

        {/* Right: Summary + Address Preview */}
        <div className="space-y-5 lg:col-span-5 lg:sticky lg:top-24">
          <OrderSummary cartDetails={cartDetails} />

          <AddressPreview
            fullName={fullName}
            phone={phone}
            email={email}
            houseDetails={houseDetails}
            streetAreaDetails={streetAreaDetails}
            selectedLocality={selectedLocality}
            district={district}
            pincode={pincode}
            deliveryInstructions={deliveryInstructions}
          />
        </div>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={isSubmittedModalOpen}
        generatedMessageText={generatedMessageText}
        generatedWaUrl={generatedWaUrl}
        onClose={() => setIsSubmittedModalOpen(false)}
        onDone={handleOrderDone}
      />
    </div>
  );
};

export default CheckoutPage;