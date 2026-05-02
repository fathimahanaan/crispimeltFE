import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../../utils/NavItems";
import { navItems2 } from "../../utils/NavItems2";

export default function MobileMenu({ open, setOpen }) {
  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* DRAWER */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-[75%] bg-white z-50 shadow-xl p-6"
      >
        {/* TITLE */}
        <h2 className="text-xl font-bold text-[#6B3F3F] mb-6">
          Menu
        </h2>

        {/* NAV ITEMS */}
        <div className="space-y-4">
          {navItems?.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block text-[#6B3F3F] text-base font-medium"
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <hr className="my-5" />

        <div className="space-y-4">
          {navItems2?.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block text-[#6B3F3F] text-base font-medium"
            >
              {item.name}
            </NavLink>
          ))}
        </div>

      </motion.div>
    </>
  );
}