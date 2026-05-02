import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-15 lg:px-20 xl:px-60 bg-[#faf7f4]">

      <div className="border border-[#6B3F3F] rounded-sm p-10 bg-white shadow-sm">

        {/* Heading */}
        <div className="text-center mb-16 p-6 rounded-sm bg-[#f3e7df]">
          <h2 className="text-2xl md:text-4xl font-[Inter] text-[#6B3F3F] border-b-2 border-[#C96A6A] pb-2 inline-block">
            About Crispimelts
          </h2>
        </div>

        {/* Story + Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/images/tres.png"
              alt="Crispimelts Bakery"
              className="shadow-md w-[320px] md:w-[360px] object-cover rounded-sm border border-[#f3e7df]"
            />
          </div>

          {/* Story Text */}
          <div className="space-y-6">

            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                At <span className="font-semibold text-[#6B3F3F]">Crispimelts</span>,
                we are passionate about creating fresh, flavorful bakery products
                that bring joy to everyday moments. With a focus on quality ingredients
                and expert baking, we craft each item to deliver the perfect balance
                of crispness and softness.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mt-3">
                From our ovens to your table, every product reflects our commitment
                to taste, freshness, and consistency. At Crispimelts, we don’t just
                bake, we create moments to enjoy and remember.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#6B3F3F] mb-2">
                Our Bakery Industry Experience
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg">
                With over 20–30 years of experience in the bakery industry,
                <span className="font-semibold text-[#6B3F3F]"> Crispimelts </span>
                is built on a strong foundation of expertise, innovation,
                and dedication. Our journey spans large-scale bakery production,
                product development, and deep market understanding across the region.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg mt-3">
                By combining traditional baking knowledge with modern technology,
                we consistently deliver products that meet the highest standards
                of quality, taste, and reliability.
              </p>
            </div>

            {/* SHOP BUTTON (REPLACED WHATSAPP) */}
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-[#6B3F3F] text-white rounded-sm font-[Inter] text-sm hover:bg-[#C96A6A] transition"
            >
              Shop
            </Link>

          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">

          {/* Passion */}
          <div className="p-6 border border-[#f3e7df] rounded-sm hover:shadow-md transition bg-[#fffaf7]">
            <h4 className="text-xl font-semibold text-[#6B3F3F] mb-2">
              Led by Passion
            </h4>

            <p className="text-gray-700 text-lg leading-relaxed">
              Baking is more than a process at
              <span className="font-semibold text-[#6B3F3F]"> Crispimelts, </span>
              it’s our passion. We pour care and dedication into every product
              to create flavors that bring comfort, joy, and lasting memories.
            </p>
          </div>

          {/* Inspiration */}
          <div className="p-6 border border-[#f3e7df] rounded-sm hover:shadow-md transition bg-[#fffaf7]">
            <h4 className="text-xl font-semibold text-[#6B3F3F] mb-2">
              Led by Inspiration
            </h4>

            <p className="text-gray-700 text-lg leading-relaxed">
              Inspiration drives our creativity. We continuously explore new
              ideas and flavors to craft bakery products that delight our
              customers every day.
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 border border-[#f3e7df] rounded-sm hover:shadow-md transition bg-[#fffaf7]">
            <h4 className="text-xl font-semibold text-[#6B3F3F] mb-2">
              Our Vision
            </h4>

            <p className="text-gray-700 text-lg leading-relaxed">
              To become a leading bakery brand recognized for excellence,
              innovation, and delivering a superior taste experience.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}