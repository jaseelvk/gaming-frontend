import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../screens/MainPage";
import AddProduct from "../screens/SpotlightItems/SpotlightInnerComponent/AddProduct";
import SinglePage from "../screens/SinglePageItems/SinglePage";
import WishList from "../screens/SpotlightItems/SpotlightInnerComponent/WishList";
import ProtectedRoute from "./ProtectedRoute";

const HomeStack = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="*" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/edit" element={<AddProduct />} />
        <Route path="/products/view/:productId" element={<SinglePage />} />
        <Route path="/wishlist" element={<WishList />} />
      </Route>
    </Routes>
  );
};

export default HomeStack;