import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./page/Layout";
import Home from "./components/Home/Home";

import ShopPage from "./page/shop/ShopPage";
import ViewProduct from "./components/product/ViewProduct";
import CartList from "./components/cart/CartList";
import LoginPage from "./page/auth/LoginPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: (
        <div className="text-center mt-20 text-2xl font-bold">
          Page Not Found
        </div>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: <ShopPage />,
        },
        {
          path: "product/:id",
          element: <ViewProduct />,
        },
          {
          path: "cart",
          element:  <CartList/>,
        },
           {
          path: "login",
          element:  <LoginPage/>,
        },
           {
          path: "login",
          element:  <LoginPage/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
