import React from "react";
import { NavLink, Link } from "react-router-dom";
import { navItems } from "../../utils/NavItems";
import { navItems2 } from "../../utils/NavItems2";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">

      {/* 🟤 TOP BAR */}
      <div className="bg-[#5D3838] text-white text-sm py-2 text-center font-[Lora]">
        Freshly baked treats every morning •  
      </div>

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-8 text-[#8B5E3C]">
            {navItems2.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className="hover:text-[#E35D6A] transition"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* CENTER LOGO */}
          <Link
            to="/"
            className="text-3xl font-[Corinthia] font-bold text-[#8B5E3C]"
          >
            Crispimelts
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-6 text-[#5D3838]">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition hover:text-[#E35D6A] ${
                    isActive ? "text-[#E35D6A] font-semibold" : ""
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

    </header>
  );
}