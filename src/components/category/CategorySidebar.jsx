import React from "react";

export default function CategorySidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="w-56 hidden md:block bg-white border border-[#f2e6df] rounded-xl p-4 h-fit sticky top-20">

      <h2 className="text-sm font-semibold text-[#3B2F2F] mb-4">
        Categories
      </h2>

      <ul className="space-y-2">

        {/* ALL */}
        <li
          onClick={() => setSelectedCategory("All")}
          className={`cursor-pointer px-3 py-2 rounded-md text-sm transition ${
            selectedCategory === "All"
              ? "bg-amber-900 text-white"
              : "hover:bg-amber-100 text-amber-800"
          }`}
        >
          All
        </li>

        {/* DB categories */}
        {categories.map((cat) => (
          <li
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`cursor-pointer px-3 py-2 rounded-md text-sm capitalize transition ${
              selectedCategory === cat._id
                ? "bg-amber-900 text-white"
                : "hover:bg-amber-100 text-amber-800"
            }`}
          >
            {cat.categoryName}
          </li>
        ))}
      </ul>

    </div>
  );
}