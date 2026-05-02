import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetSingleProduct from "../../hooks/product/useGetSingleProduct";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import useAddtoCart from "../../hooks/cart/useAddtoCart";
import useWishList from "../../hooks/auth/useWishList";

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
  const { toggleWishlist, loading: wishlistLoading } = useWishList();

  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const handleWishlist = async () => {
    const res = await toggleWishlist(product._id);

    if (res?.message?.includes("Added")) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

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

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white border-2 border-[#f3e7df] rounded-sm overflow-hidden">

        {/* IMAGE */}
        <div className="bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="p-8 flex flex-col justify-center">

          {/* CATEGORY */}
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            {product.category?.categoryName}
          </p>

          {/* NAME */}
          <h1 className="text-3xl font-semibold text-[#3B2F2F] mt-2">
            {product.name}
          </h1>

          {/* STARS */}
          <div className="mt-3">
            <Stars rating={4} />
          </div>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-5 text-sm leading-relaxed">
            {product.description}
          </p>

          {/* PRICE */}
          <p className="text-2xl font-semibold text-[#3B2F2F] mt-6">
            AED {product.price}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mt-6">

            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#f3e7df] hover:bg-gray-50 transition"
            >
              -
            </button>

            <span className="text-lg font-medium w-8 text-center">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#f3e7df] hover:bg-gray-50 transition"
            >
              +
            </button>

          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-8">

            {/* WISHLIST */}
            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className="flex-1 text-xs py-2 rounded-full flex items-center justify-center gap-1
              border border-[#f3e7df] text-[#6B3F3F] shadow-sm
              hover:bg-[#C96A6A] hover:text-white hover:border-[#C96A6A]
              transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <FaHeart className={liked ? "text-red-500" : ""} />
              {wishlistLoading
                ? "Updating..."
                : liked
                ? "Wishlisted"
                : "Wishlist"}
            </button>

            {/* CART */}
            <button
              onClick={() => addToCart(product._id, quantity)}
              disabled={cartLoading}
              className="flex-1 text-xs py-2 rounded-full flex items-center justify-center gap-1
              border border-[#6B3F3F] bg-[#6B3F3F] text-white shadow-sm
              hover:bg-[#C96A6A] hover:border-[#C96A6A]
              transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              <FaShoppingCart size={14} />
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