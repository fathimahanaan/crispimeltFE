import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccountSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white border border-[#f3e7df] rounded-sm p-4 shadow-sm">

      {/* HEADER */}
      <h2 className="text-lg font-semibold text-[#3B2F2F] mb-4">
        Account
      </h2>

      {/* FAKE USER */}
      <div className="mb-4">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-gray-500">john@example.com</p>
      </div>

      <hr className="my-3" />

      {/* MENU */}
      <div className="flex flex-col gap-2 text-sm">

        <button
          onClick={() => navigate("/my-orders")}
          className="text-left px-3 py-2 rounded hover:bg-amber-50"
        >
          My Orders
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-left px-3 py-2 rounded hover:bg-amber-50"
        >
          Profile
        </button>

        <button
          onClick={() => navigate("/wishlist")}
          className="text-left px-3 py-2 rounded hover:bg-amber-50"
        >
          Wishlist
        </button>

        <button
          onClick={() => navigate("/checkout")}
          className="text-left px-3 py-2 rounded hover:bg-amber-50"
        >
          Checkout
        </button>

        <hr className="my-2" />

        <button
          onClick={() => navigate("/login")}
          className="text-left px-3 py-2 rounded text-red-600 hover:bg-red-50"
        >
          Logout
        </button>

      </div>
    </div>
  );
}