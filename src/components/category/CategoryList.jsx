import React from "react";
import useGetAllCategories from "../../hooks/category/useGetAllCategory";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const { categories, loading } = useGetAllCategories();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-[Lora] text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF7F2] to-[#fffdfb] py-20 px-6 font-[Lora]">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold text-[#3B2F2F] tracking-tight">
          Our Categories
        </h1>

        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Explore freshly baked delights crafted with love 🍞✨
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {categories.map((cat) => (
          <div
            key={cat._id}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#f3e7df]"
          >

            {/* IMAGE */}
            <div className="h-44 overflow-hidden bg-[#fff1e8] relative">

              <img
                src={cat.image}
                alt={cat.categoryName}
                className="h-full w-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
              />

              {/* soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            </div>

            {/* CONTENT */}
            <div className="p-6 text-center">

              <h2 className="text-xl font-semibold text-[#3B2F2F] capitalize tracking-wide">
                {cat.categoryName}
              </h2>

              <p className="text-xs text-gray-500 mt-2">
                Freshly baked daily selection
              </p>

              {/* BUTTON */}
              <div className="mt-6">

                <Link
                  to="/shop"
                  className="inline-block px-5 py-2.5 text-sm font-medium rounded-full border border-[#8B5E3C] text-[#8B5E3C] 
                  hover:bg-[#8B5E3C] hover:text-white transition-all duration-300 shadow-sm"
                >
                  Shop Now
                </Link>

              </div>

            </div>

            {/* subtle glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
              <div className="absolute -inset-1 bg-[#8B5E3C]/10 blur-2xl"></div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}