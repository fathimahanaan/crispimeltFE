import React, { useState } from "react";
import useGetAllCategories from "../../hooks/category/useGetAllCategory";
import useGetAllProducts from "../../hooks/product/useGetAllProducts";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Stars = ({ rating = 4 }) => (
  <div className="flex justify-center gap-1 text-[#C8A24A] text-sm">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < rating ? "★" : "☆"}</span>
    ))}
  </div>
);

export default function Shop() {
  const navigate = useNavigate();

  const { products = [] } = useGetAllProducts();
  const { categories = [] } = useGetAllCategories();

  const [category, setCategory] = useState("All");
console.log("PRODUCTS:", products);
  const filteredProducts = products.filter((item) =>
    category === "All" ? true : item.category?.categoryName === category,
  );

  return (
    <div className="min-h-screen py-12 px-6 font-[Lora] bg-[radial-gradient(circle_at_top,#fff7f2,white)]">
      <h1 className="text-center text-3xl   text-[#3B2F2F] mb-10">Shop</h1>

      <div className="max-w-6xl mx-auto flex gap-6">
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                className="group bg-[#fffdfc] rounded-lg overflow-hidden border border-[#f2e6df] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-50 w-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                  <span className="absolute top-2 left-2 bg-[#C8A24A]/90 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    {item.category?.categoryName}
                  </span>
                </div>

                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-[#3B2F2F]">
                    {item.name}
                  </h3>

                  <Stars rating={4} />

                  <p className="text-sm text-gray-600   mt-1">
                    AED {item.price}
                  </p>

                  <div className="flex gap-2 mt-3">
                    {/* VIEW PRODUCT */}

                 
                    <button
                      onClick={() => {
                        navigate(`/product/${item._id}`);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 border border-gray-500 text-gray-700 hover:bg-gray-500 hover:text-white text-xs py-2 rounded-full transition"
                    >
                  
                      View details
                    </button>

                    {/* WISHLIST */}

                    {/* ADD TO CART */}
                    <button className="flex-1 flex items-center justify-center gap-1 border border-amber-900 text-amber-900 hover:bg-amber-900 hover:text-white text-xs py-2 rounded-full transition">
                      <FaShoppingCart size={14} />
                     add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY SIDEBAR (UNCHANGED UI) */}
        <aside className="w-64 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-sm p-5 h-[500px] overflow-y-auto sticky top-24">
          <h2 className="text-lg font-semibold text-[#3B2F2F] mb-4">
            Categories
          </h2>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setCategory("All")}
              className={`text-left px-4 py-2 rounded-xl text-sm transition shadow-sm ${
                category === "All"
                  ? "bg-[#C8A24A] text-white"
                  : "bg-[#f9f5f2] hover:bg-[#f3e8e2]"
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setCategory(cat.categoryName)}
                className={`text-left px-4 py-2 rounded-xl text-sm transition shadow-sm ${
                  category === cat.categoryName
                    ? "bg-[#C8A24A] text-white"
                    : "bg-[#f9f5f2] hover:bg-[#f3e8e2]"
                }`}
              >
                {cat.categoryName}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
