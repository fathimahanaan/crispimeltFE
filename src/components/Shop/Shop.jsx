import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useGetAllCategories from "../../hooks/category/useGetAllCategory";
import useGetAllProducts from "../../hooks/product/useGetAllProducts";
import CategorySidebar from "../category/CategorySidebar";
import useAddtoCart from "../../hooks/cart/useAddtoCart";

export default function Shop() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadingId, setLoadingId] = useState(null); // ⭐ per-product loading

  const { categories = [] } = useGetAllCategories();
  const { products = [], loading } = useGetAllProducts(selectedCategory);
  const { addToCart } = useAddtoCart(); // ❌ removed global loading

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-6 font-[Lora]">
      <h1 className="text-center text-3xl text-[#3B2F2F] mb-10">
        Shop
      </h1>

      <div className="max-w-5xl mx-auto flex flex-row-reverse gap-6">

        {/* SIDEBAR */}
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* PRODUCTS */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">

          {products.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              No products found
            </div>
          ) : (
            products.map((item) => (
              <div
                key={item._id}
                className="bg-white border-2 border-[#f3e7df] rounded-sm overflow-hidden shadow-sm"
              >

                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />

                {/* CONTENT */}
                <div className="p-3 text-center">

                  <h3 className="text-sm font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    AED {item.price}
                  </p>

                  <div className="flex gap-2 mt-3">

                    {/* VIEW */}
                    <button
                      onClick={() => navigate(`/product/${item._id}`)}
                      className="flex-1 text-xs py-2 rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm
                      hover:bg-white-50 hover:shadow-md hover:border-amber-300
                      transition-all duration-200 active:scale-95"
                    >
                      View
                    </button>

                    {/* ADD TO CART (FIXED) */}
                    <button
                      onClick={async () => {
                        setLoadingId(item._id);
                        await addToCart(item._id, 1);
                        setLoadingId(null);
                      }}
                      disabled={loadingId === item._id}
                      className="flex-1 text-xs py-2 rounded-full flex items-center justify-center gap-1
                      border border-amber-900 text-amber-900 shadow-sm
                      hover:bg-amber-900 hover:text-white hover:shadow-md
                      transition-all duration-200 active:scale-95 disabled:opacity-50"
                    >
                      <FaShoppingCart size={14} />
                      {loadingId === item._id ? "Adding..." : "Add"}
                    </button>

                  </div>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}