import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleProduct from "../../hooks/product/useGetSingleProduct";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useAddtoCart from "../../hooks/cart/useAddtoCart";

const Stars = ({ rating = 4 }) => (
  <div className="flex gap-1 text-[#C8A24A] text-sm">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < rating ? "★" : "☆"}</span>
    ))}
  </div>
);

export default function ViewProduct() {
  const { id } = useParams();
  const { product, loading } = useGetSingleProduct(id);
  const { addToCart, loading: cartLoading } = useAddtoCart();

  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f4] px-6 py-14 font-[Lora]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-md overflow-hidden">

        {/* IMAGE */}
        <div className="bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="p-8 flex flex-col justify-center">

          <p className="text-xs text-gray-400 uppercase tracking-widest">
            {product.category?.categoryName}
          </p>

          <h1 className="text-3xl font-semibold text-[#2f2a26] mt-2">
            {product.name}
          </h1>

          <div className="mt-2">
            <Stars rating={4} />
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed text-sm">
            {product.description}
          </p>

          <p className="text-2xl font-semibold text-[#3B2F2F] mt-6">
            AED {product.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span className="text-lg font-medium">{quantity}</span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-8">

            <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              <FaHeart />
              Wishlist
            </button>

            <button
              onClick={() => addToCart(product._id, quantity)}
              disabled={cartLoading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#3B2F2F] text-white rounded-lg hover:bg-black transition disabled:opacity-50"
            >
              <FaShoppingCart />
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>

          </div>

          <p className="text-xs text-gray-400 mt-6">
            Premium handcrafted collection
          </p>

        </div>
      </div>
    </div>
  );
}