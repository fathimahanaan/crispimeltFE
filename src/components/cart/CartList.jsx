import React from "react";
import useGetCart from "../../hooks/cart/useGetCart";
import useRemoveCart from "../../hooks/cart/useRemoveCart";
import { FaTrash } from "react-icons/fa";

export default function CartList() {
  const { cart, loading, refetch } = useGetCart();
  const { removeFromCart, loading: removeLoading } = useRemoveCart();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-[Lora] text-gray-500">
        Loading cart...
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-[Lora] text-gray-500">
        <h2 className="text-3xl text-[#3B2F2F] mb-2">Your Cart is Empty</h2>
        <p className="text-sm">Add something sweet from the shop 🍰</p>
      </div>
    );
  }

  // ✅ FIXED: prevents crash if product is null
  const total = (cart || []).reduce(
    (sum, item) =>
      sum + (item?.product?.price ?? 0) * (item?.quantity ?? 0),
    0
  );

  const deliveryFee = total > 100 ? 0 : 10;
  const grandTotal = total + deliveryFee;

  return (
    <div className="min-h-screen bg-[#FFF7F2] py-16 px-6 font-[Lora]">

      {/* TITLE */}
      <div className="text-center mb-12">
        <h1 className="text-4xl text-[#3B2F2F] font-semibold">
          Your Cart
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Fresh bakery items ready for checkout
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">

        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-6">

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-[#f1e4dc] shadow-sm hover:shadow-md transition"
            >

              {/* IMAGE */}
              <img
                src={item?.product?.image}
                alt={item?.product?.name}
                className="w-24 h-24 object-cover rounded-xl"
              />

              {/* DETAILS */}
              <div className="flex-1">

                <h2 className="text-lg font-semibold text-[#3B2F2F]">
                  {item?.product?.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  AED {item?.product?.price ?? 0}
                </p>

                <span className="inline-block mt-2 text-xs bg-[#C8A24A]/10 text-[#C8A24A] px-2 py-1 rounded-full">
                  Qty: {item?.quantity ?? 0}
                </span>

              </div>

              {/* PRICE */}
              <div className="text-lg font-semibold text-[#3B2F2F]">
                AED {(item?.product?.price ?? 0) * (item?.quantity ?? 0)}
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={async () => {
                  await removeFromCart(item._id);
                  refetch();
                }}
                disabled={removeLoading}
                className="text-gray-400 hover:text-red-500 transition disabled:opacity-50"
              >
                <FaTrash />
              </button>

            </div>
          ))}

        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white border border-[#f1e4dc] rounded-2xl p-8 shadow-sm h-fit">

          <h2 className="text-xl font-semibold text-[#3B2F2F] mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-600 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>AED {total}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-[#8B5E3C]">
                {deliveryFee === 0 ? "Free" : `AED ${deliveryFee}`}
              </span>
            </div>

          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-semibold text-[#3B2F2F]">
            <span>Total</span>
            <span>AED {grandTotal}</span>
          </div>

          <button className="w-full mt-6 bg-[#8B5E3C] text-white py-3 rounded-lg hover:opacity-90 transition">
            Checkout
          </button>

        </div>

      </div>
    </div>
  );
}