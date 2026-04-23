import React from "react";
import { NavLink, Link } from "react-router-dom";
import { navItems } from "../../utils/NavItems";
import { navItems2 } from "../../utils/NavItems2";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="bg-[#6B3F3F] text-[#FFF6F0] text-sm py-2 text-center font-[Lora]">
        Freshly baked treats every morning •
      </div>

      {/* NAVBAR 1 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-3 items-center">

          {/* LEFT */}
          <div className="flex justify-start text-sm text-[#6B3F3F] font-medium">
            wishlist
          </div>

          {/* CENTER LOGO */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-3xl font-[Corinthia] font-bold text-[#6B3F3F]"
            >
              Crispimelts
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex justify-end items-center gap-8 text-[#6B3F3F] text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition hover:text-[#C96A6A] ${
                    isActive ? "text-[#C96A6A] font-semibold" : ""
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>

        </div>
      </nav>

      {/* NAVBAR 2 */}
      <nav className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center">
          <div className="flex items-center gap-10 text-[#6B3F3F] text-sm font-medium">
            {navItems2.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="hover:text-[#C96A6A] transition"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

    </header>
  );
}