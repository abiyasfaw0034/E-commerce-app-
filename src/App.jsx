/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";
// import Booking from "./pages/Booking";
import Applayout from "./ui/Applayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { CartProvider } from "./context/cartContext";
import Cart from "./pages/Cart";
import ProductItem from "./pages/ProductItem";
import SignUp from "./auth/SignUp";
import ProtectedRoute from "./ui/ProtectedRoute";
import LogIn from "./auth/LogIn";
import Order from "./pages/Order";
import About from "./pages/About";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<div>pagenotfound</div>} />
            {/* remember te cart provider is only for the applayout */}
            <Route
              element={
                <ProtectedRoute>
                  <Applayout />
                </ProtectedRoute>
              }
            >
              {/* <Route index element={<Navigate replace to="product" />} />
               */}
              <Route path="product" element={<Product />} />
              <Route path="orders" element={<Order />} />

              <Route path="product/:productname" element={<ProductItem />} />
              <Route path="cart" element={<Cart />} />
              <Route path="store" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "text-gray-700",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
