import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../screens/User/Login";
import SignUp from "../screens/User/SignUp";

function AuthStack() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default AuthStack;