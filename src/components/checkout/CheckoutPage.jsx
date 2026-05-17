import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import usePreviewOrder from "../../hooks/previewOrder/usePreviewOrder";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const { preview, loading, previewOrder } = usePreviewOrder();

  const [showReview, setShowReview] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    emirate: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const debounceRef = useRef(null);
  const lastPayloadRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.fullName &&
    form.phone &&
    form.address &&
    form.emirate &&
    form.deliveryDate &&
    form.deliveryTime;

  const normalizedItems = cartItems.map((item) => ({
    product: item.product || item.productId,
    name:
      item.product?.name ||
      item.name ||
      item.title ||
      item.productName ||
      "Unnamed item",
    price: item.price || 0,
    quantity: item.quantity || item.qty || 1,
  }));

  useEffect(() => {
    if (!showReview) return;
    if (!isFormValid) return;

    const payload = {
      items: normalizedItems,
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        emirate: form.emirate,
      },
      deliveryDate: form.deliveryDate,
      deliveryTime: form.deliveryTime,
    };

    const payloadString = JSON.stringify(payload);

    if (lastPayloadRef.current === payloadString) return;
    lastPayloadRef.current = payloadString;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      previewOrder(payload);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [showReview, form, cartItems]);

  return (
    <div className="min-h-screen bg-[#FFF7F2] py-16 px-6 font-[Lora]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT FORM */}
         
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
         
           <Link
            to="/cart"
            className="text-sm text-gray-800 underline hover:text-black"
          >
            Back to Cart
          </Link> 
          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:outline-none transition"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:outline-none transition"
            />

            <input
              name="emirate"
              placeholder="Emirate"
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:outline-none transition md:col-span-2"
            />

            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:outline-none transition md:col-span-2"
            />

            <input
              type="date"
              name="deliveryDate"
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:outline-none transition"
            />

            <input
              type="time"
              name="deliveryTime"
              onChange={handleChange}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/10 focus:outline-none transition"
            />
          </div>
         
          {/* REVIEW BUTTON */}
          <button
            disabled={!isFormValid}
            onClick={() => setShowReview(true)}
            className="w-full mt-6 bg-amber-900 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Review Order
          </button>
        </div>

        {/* BACKDROP */}
        {showReview && (
          <div
            onClick={() => setShowReview(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}

        {/* DRAWER */}
        <div
          className={`fixed top-0 right-0 h-full w-full md:w-[440px] bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-100 z-50 transform transition-transform duration-300
          ${showReview ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 flex flex-col h-full">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Review Order</h2>

              <button
                onClick={() => setShowReview(false)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            {!preview ? (
              <p className="text-sm text-gray-500">Loading order summary...</p>
            ) : (
              <div className="space-y-4 text-sm flex-1 overflow-auto">
                {/* ITEMS */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-medium mb-3">Items</h3>

                  {normalizedItems.length === 0 ? (
                    <p className="text-xs text-gray-500">No items in cart</p>
                  ) : (
                    <div className="space-y-3">
                      {normalizedItems.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-start text-xs border-b border-gray-100 pb-3 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* COSTS */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>AED {preview.subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>AED {preview.shippingCharge}</span>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>AED {preview.total}</span>
                </div>

                {/* DELIVERY */}
                <div className="text-xs text-gray-500">
                  Delivery: {preview.deliveryDate} {preview.deliveryTime}
                </div>

                {/* LOADING */}
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                    Updating...
                  </div>
                )}
              </div>
            )}

            {/* FOOTER */}
            <div className="mt-4 space-y-2">
              <button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                Place Order
              </button>

              <button
                onClick={() => setShowReview(false)}
                className="w-full text-sm text-gray-500 underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
