import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleProduct from "../../hooks/product/useGetSingleProduct";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useAddtoCart from "../../hooks/cart/useAddtoCart";

const Stars = ({ rating = 4 }) => (
  <div className="flex gap-1 text-amber-500 text-sm">
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
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f4] to-[#f3ede7] px-6 py-14 font-[Lora]">
      
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white rounded-sm   overflow-hidden">
        
        {/* IMAGE */}
        <div className="relative bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* DETAILS */}
        <div className="p-10 flex flex-col justify-center">

          <p className="text-xs text-amber-700 uppercase tracking-widest font-medium">
            {product.category?.categoryName}
          </p>

          <h1 className="text-4xl font-bold text-[#2f2a26] mt-2 leading-snug">
            {product.name}
          </h1>

          <div className="mt-3">
            <Stars rating={4} />
          </div>

          <p className="text-gray-600 mt-5 leading-relaxed text-sm">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-[#3B2F2F] mt-6">
            AED {product.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">
            
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
            >
              -
            </button>

            <span className="text-xl font-semibold w-8 text-center">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            <button className="flex-1 flex items-center justify-center gap-2 py-3  border border-gray-400 text-gray-700 hover:bg-gray-100 transition">
              <FaHeart />
             Add to Wishlist
            </button>

            <button
              onClick={() => addToCart(product._id, quantity)}
              disabled={cartLoading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-400 text-white hover:bg-amber-900 transition disabled:opacity-50"
            >
              <FaShoppingCart />
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>

          </div>

          <p className="text-xs text-gray-400 mt-6">
            Handcrafted premium selection ✨
          </p>

        </div>
      </div>
    </div>
  );
}