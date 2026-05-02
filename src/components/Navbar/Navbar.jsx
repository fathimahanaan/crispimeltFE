import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navItems } from "../../utils/NavItems";
import { navItems2 } from "../../utils/NavItems2";
import { FaHeart, FaBars } from "react-icons/fa";
import useGetWishlist from "../../hooks/wishlist/useGetWislist";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const { wishlist } = useGetWishlist();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="bg-[#6B3F3F] text-[#FFF6F0] text-sm py-2 text-center font-[Lora]">
        Freshly baked treats every morning
      </div>

      {/* DESKTOP NAVBAR */}
      <nav className="bg-white shadow-sm hidden md:block">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-3 items-center">

          {/* LEFT */}
          <div className="flex justify-start text-sm font-medium">
            <NavLink
              to="/wishlist"
              className="relative flex items-center gap-2 text-[#6B3F3F]"
            >
              <FaHeart className="text-xs" />
              Wishlist

              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-4 text-[10px] bg-[#C96A6A] text-white w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* LOGO */}
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-3xl font-[Corinthia] font-bold text-[#6B3F3F]"
            >
              Crispimelts
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex justify-end items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition hover:text-[#C96A6A] ${
                    isActive ? "text-[#C96A6A] font-semibold" : "text-[#6B3F3F]"
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

      {/* NAVBAR 2 (DESKTOP ONLY) */}
      <nav className="hidden md:block bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center">
          <div className="flex items-center gap-10 text-[#6B3F3F] text-sm font-medium">
            {navItems2.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-[#C96A6A] transition ${
                    isActive ? "text-[#C96A6A] font-semibold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-sm">

        {/* MENU BUTTON */}
        <button onClick={() => setOpen(true)}>
          <FaBars size={20} />
        </button>

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-[Corinthia] text-[#6B3F3F]"
        >
          Crispimelts
        </Link>

        {/* EMPTY RIGHT SPACE (balance) */}
        <div className="w-6"></div>

      </div>

      {/* MOBILE MENU */}
      <MobileMenu open={open} setOpen={setOpen} />

    </header>
  );
}