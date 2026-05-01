import React from "react";
import { Link } from "react-router-dom";
import CategoryList from "../category/CategoryList";

export default function Home() {

  const scrollToCategories = (e) => {
    e.preventDefault();
    document.getElementById("categories")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* HERO SECTION */}
  <section className="min-h-[calc(100vh-140px)] flex items-center bg-[#FFF7F2] px-10 font-[Lora]">
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">

            <p className="text-[#8B5E3C] text-3xl md:text-4xl font-semibold font-[Corinthia]">
              Fresh & Warm
            </p>

            <h1 className="text-[#E35D6A] text-5xl md:text-6xl font-bold mt-2 font-[Corinthia]">
              Bakery Delight
            </h1>

            <p className="mt-6 text-[#5A4033] max-w-md mx-auto md:mx-0">
              Handmade pastries, fresh bread, and sweet treats baked daily with love and tradition.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

              {/* Smooth scroll button */}
              <a
                href="#categories"
                onClick={scrollToCategories}
                className="border border-[#5D3838] text-[#5D3838] px-6 py-3 rounded-md hover:bg-[#5D3838] hover:text-white transition"
              >
                Explore
              </a>

              <Link
                to="/shop"
                className="bg-[#8B5E3C] text-white px-6 py-3 rounded-md hover:opacity-90 transition"
              >
                Shop Now
              </Link>

            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/tres.png"
              alt="Bakery Items"
              loading="lazy"
              className="w-full max-w-md md:max-w-lg object-contain"
            />
          </div>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section id="categories" className="scroll-mt-20">
        <CategoryList />
      </section>
    </div>
  );
}