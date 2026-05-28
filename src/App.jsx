import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./page/Layout";
import Home from "./components/Home/Home";
import ShopPage from "./page/shop/ShopPage";
import ViewProduct from "./components/product/ViewProduct";
import CartList from "./components/cart/CartList";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import VerifyOtpPage from "./page/auth/VerifyOtpPage";
import About from "./components/about/About";
import Wishlist from "./components/wishlist/Wishlist";
import CheckoutPage from "./components/checkout/CheckoutPage";
import ContactPage from "./page/contact/ContactPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: (
        <div className="text-center mt-20 text-2xl font-bold">
          Page under construction
        </div>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <ShopPage /> },
        { path: "product/:id", element: <ViewProduct /> },
        { path: "cart", element: <CartList /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "verify-otp", element: <VerifyOtpPage /> },
        { path: "about", element: <About /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
  ]);

  return (
    <>
 
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <RouterProvider router={router} />
    </>
  );
}

export default App;