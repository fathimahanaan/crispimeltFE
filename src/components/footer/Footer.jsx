import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaTwitter,
  FaHeart,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import { navItems } from "../../utils/NavItems";
import { navItems2 } from "../../utils/NavItems2";
import useGetWishlist from "../../hooks/wishlist/useGetWislist";
import { useAuth } from "../../context/AuthContext";
import useLogout from "../../hooks/auth/useLogout";

export default function Footer() {
  const { wishlist } = useGetWishlist();
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    <footer className="bg-amber-900/30 border-t border-[#6B3F3F]/20 text-[#6B3F3F]">

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6 py-14">

        {/* BRAND */}
        <div>
          <Link
            to="/"
            className="text-3xl font-[Corinthia] font-bold text-[#6B3F3F]"
          >
            Crispimelts
          </Link>

          <p className="mt-4 text-sm text-[#6B3F3F]/80 leading-relaxed">
            Premium custom cakes and signature desserts crafted with passion.
            Making every celebration sweeter.
          </p>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex items-center gap-2 mt-5 text-sm hover:text-[#C96A6A] transition"
          >
            <FaHeart />
            Wishlist
            {wishlist?.length > 0 && (
              <span className="bg-[#C96A6A] text-white text-xs px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>

        {/* NAV LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-[#6B3F3F]">Quick Links</h3>

          <ul className="space-y-2 text-sm">

            {[...navItems, ...navItems2].map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition hover:text-[#C96A6A] ${
                      isActive ? "text-[#C96A6A] font-semibold" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>

          <p className="text-sm text-[#6B3F3F]/80">
            Crispimelts General Trading LLC
          </p>
          <p className="text-sm text-[#6B3F3F]/80">
            United Arab Emirates
          </p>

          <a
            href="mailto:info@crispimelts.ae"
            className="block mt-3 text-sm hover:text-[#C96A6A] transition"
          >
            info@crispimelts.ae
          </a>

          <a
            href="tel:+971525657667"
            className="block text-sm hover:text-[#C96A6A] transition"
          >
            +971 52 565 7667
          </a>

          {/* AUTH */}
          <div className="mt-4">
            {user ? (
              <button
                onClick={logout}
                className="text-sm hover:text-[#C96A6A] transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm hover:text-[#C96A6A] transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-5 text-lg text-[#6B3F3F]">
            <a className="hover:text-[#C96A6A] transition"><FaFacebookF /></a>
            <a className="hover:text-[#C96A6A] transition"><FaInstagram /></a>
            <a className="hover:text-[#C96A6A] transition"><FaYoutube /></a>
            <a className="hover:text-[#C96A6A] transition"><FaPinterestP /></a>
            <a className="hover:text-[#C96A6A] transition"><FaTwitter /></a>
            <a className="hover:text-[#C96A6A] transition"><SiTiktok /></a>
          </div>

        </div>

      </div>

      {/* BOTTOM BAR (matches navbar top bar vibe) */}
      <div className="bg-[#6B3F3F] text-[#FFF6F0] text-center text-sm py-4">
        © {new Date().getFullYear()} Crispimelts. All rights reserved.
      </div>

    </footer>
  );
}