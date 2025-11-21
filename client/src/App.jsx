import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductDetailPage from "./pages/ProductDetailPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Show Product Detail Page directly on root */}
        <Route path="/" element={<ProductDetailPage />} />

        {/* Support dynamic product IDs */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
