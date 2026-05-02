import React from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetWishlist from "../../hooks/wishlist/useGetWislist";
import useWishList from "../../hooks/auth/useWishList";

export default function Wishlist() {
  const { wishlist, loading, refetch } = useGetWishlist();
  const { toggleWishlist, loading: actionLoading } = useWishList();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    const res = await toggleWishlist(productId);
    if (res) refetch();
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="text-center py-20 text-amber-900">
        Your wishlist is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 font-[Lora]">

      {/* TITLE */}
      <h1 className="text-center text-3xl text-[#3B2F2F] mb-10">
        Wishlist
      </h1>

      {/* GRID (same as shop) */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">

        {wishlist.map((item) => {
          const product = item.product;
          if (!product) return null;

          return (
            <div
              key={item._id}
              className="bg-white border-2 border-[#f3e7df] rounded-sm overflow-hidden shadow-sm"
            >

              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />

              {/* CONTENT */}
              <div className="p-3 text-center">

                <h3 className="text-sm font-semibold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600">
                  AED {product.price}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="flex-1 text-xs py-2 rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm
             hover:bg-white-50 hover:shadow-md hover:border-amber-300
             transition-all duration-200 active:scale-95"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleRemove(product._id)}
                    disabled={actionLoading}
                    className="flex-1 text-xs py-2 rounded-full flex items-center justify-center gap-1
              border border-amber-900 text-amber-900 shadow-sm
             hover:bg-amber-900 hover:text-white hover:shadow-md
             transition-all duration-200 active:scale-95"
                  >
                    <FaHeart size={14} />
                    Remove
                  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}