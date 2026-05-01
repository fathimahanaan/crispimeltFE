import React from "react";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-15 lg:px-20 xl:px-60 bg-white">

      <div className="border-4 border-amber-900 rounded-sm p-10">

        {/* Heading */}
        <div className="text-center mb-16 p-6 rounded-md bg-gradient-to-r from-amber-100 via-amber-000 to-amber-100">
          <h2 className="text-2xl md:text-4xl font-[Inter] text-amber-900 border-b-2 border-amber-700 pb-2 inline-block">
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
              className="shadow-lg w-[320px] md:w-[360px] object-cover rounded-md border border-amber-200"
            />
          </div>

          {/* Story Text */}
          <div className="space-y-6">

            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                At <span className="font-semibold text-amber-900">Crispimelts</span>,
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
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Our Bakery Industry Experience
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg">
                With over 20–30 years of experience in the bakery industry,
                <span className="font-semibold text-amber-900"> Crispimelts </span>
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

            <a
              href="https://wa.me/971525657667"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-amber-900 text-white rounded-sm font-[Inter] text-sm hover:bg-amber-800 transition"
            >
              Order Cake
            </a>

          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">

          {/* Passion */}
          <div className="p-6 border border-amber-300 rounded-md hover:shadow-md transition bg-amber-50">
            <h4 className="text-xl font-semibold text-amber-900 mb-2">
              Led by Passion
            </h4>

            <p className="text-gray-700 text-lg leading-relaxed">
              Baking is more than a process at
              <span className="font-semibold text-amber-900"> Crispimelts, </span>
              it’s our passion. We pour care and dedication into every product
              to create flavors that bring comfort, joy, and lasting memories.
            </p>
          </div>

          {/* Inspiration */}
          <div className="p-6 border border-amber-300 rounded-md hover:shadow-md transition bg-amber-50">
            <h4 className="text-xl font-semibold text-amber-900 mb-2">
              Led by Inspiration
            </h4>

            <p className="text-gray-700 text-lg leading-relaxed">
              Inspiration drives our creativity. We continuously explore new
              ideas and flavors to craft bakery products that delight our
              customers every day.
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 border border-amber-300 rounded-md hover:shadow-md transition bg-amber-50">
            <h4 className="text-xl font-semibold text-amber-900 mb-2">
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