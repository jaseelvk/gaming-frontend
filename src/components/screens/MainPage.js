// File: /screens/MainPage.js
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import Header from "../includes/Header";
import SubHeader from "../includes/HeaderInnerChaild/SubHeader";
import Spotlight from "./SpotlightItems/Spotlight";
import Footer from "../includes/Footer";
import {  useNavigate } from "react-router-dom";

function MainPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
    <Helmet><title>Sptlight Page </title></Helmet>
      <Header setSearchTerm={setSearchTerm} />
      <SubHeader />
      <Spotlight searchTerm={searchTerm} />
      <Footer />
    </>
  );
}

export default MainPage;