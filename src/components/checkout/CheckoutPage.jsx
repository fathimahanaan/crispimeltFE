import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [orderType, setOrderType] = useState("delivery");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    emirate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid =
    form.fullName &&
    form.phone &&
    (orderType === "pickup" ? true : form.address && form.emirate);

  const normalizedItems = cartItems.map((item) => ({
    product: item.product || item.productId,
    name:
      item.product?.name ||
      item.name ||
      item.title ||
      item.productName ||
      "Item",
    price: item.price || 0,
    quantity: item.quantity || item.qty || 1,
  }));

  const WHATSAPP_NUMBER = "447867109215";

  // WhatsApp enquiry only
  const sendToWhatsApp = () => {
    const text =
      `🛒 Order Help Request\n\n` +
      normalizedItems.map((i) => `• ${i.name} x${i.quantity}`).join("\n") +
      `\n\n👤 Name: ${form.fullName}` +
      `\n📞 Phone: ${form.phone}` +
      `\n📦 Type: ${orderType}` +
      `\n🚚 Delivery charge will be confirmed after contact`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // Place order → backend
  const placeOrder = async () => {
    const payload = {
      items: normalizedItems,
      orderType,
      shippingAddress: form,
      deliveryCharge: "To be confirmed after contact",
      status: "pending",
    };

    try {
      await axios.post("http://localhost:5000/orders", payload);

      alert(
        "✅ Order received! We will contact you soon to confirm delivery charge and details."
      );

      // optional redirect
      // window.location.href = "/success";

    } catch (err) {
      console.log(err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F2] py-16 px-6 font-[Lora]">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        {/* BACK */}
        <Link to="/cart" className="text-sm underline">
          ← Back to Cart
        </Link>

        <h1 className="text-2xl font-semibold mt-4 mb-6">
          Confirm Your Order
        </h1>

        {/* ORDER TYPE */}
        <div className="flex gap-4 mb-5">
          <button
            onClick={() => setOrderType("delivery")}
            className={`px-4 py-2 rounded-xl border ${
              orderType === "delivery" ? "bg-black text-white" : ""
            }`}
          >
            Delivery
          </button>

          <button
            onClick={() => setOrderType("pickup")}
            className={`px-4 py-2 rounded-xl border ${
              orderType === "pickup" ? "bg-black text-white" : ""
            }`}
          >
            Pickup
          </button>
        </div>

        {/* SIMPLE INFO */}
        {orderType === "delivery" && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
             Delivery charge will be confirmed after we contact you based on your location.
          </div>
        )}

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 border rounded-xl"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="p-3 border rounded-xl"
          />

          {orderType === "delivery" && (
            <>
              <input
                name="emirate"
                placeholder="Emirate"
                onChange={handleChange}
                className="p-3 border rounded-xl md:col-span-2"
              />

              <textarea
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className="p-3 border rounded-xl md:col-span-2"
              />
            </>
          )}
        </div>

        {/* ITEMS SUMMARY */}
        <div className="mt-6 text-sm">
          <p className="font-semibold mb-2">Order Items:</p>

          {normalizedItems.map((item, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>{item.name}</span>
              <span>x{item.quantity}</span>
            </div>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3 mt-8">

          {/* PRIMARY */}
          <button
            disabled={!isFormValid}
            onClick={placeOrder}
            className="w-full bg-black text-white py-4 rounded-xl font-semibold disabled:opacity-50"
          >
             Place Order
          </button>

          {/* SECONDARY */}
          <button
            onClick={sendToWhatsApp}
            className="w-full border border-green-600 text-green-700 py-3 rounded-xl"
          >
             Need Help? WhatsApp Us
          </button>

        </div>

        {/* FOOT NOTE */}
        <p className="text-xs text-gray-500 text-center mt-4">
          After placing your order, our team will contact you to confirm delivery details and charges.
        </p>

      </div>
    </div>
  );
}