import React from "react";
import Header from "../../components/header/Header";
import HeroSection from "../../components/herosection/HeroSection";
import SearchBar from "../../components/searchbar/SearchBar";
import HomePageLayout from "../../components/homepagelayout/HomePageLayout";
import InfoSection from "../../components/infosection/InfoSection";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../contexts/AuthContext"; // Import AuthContext để lấy thông tin người dùng
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng

import "./HomePage.scss";

const HomePage = () => {
  const { user } = useAuth();  // Lấy thông tin người dùng từ context
  const navigate = useNavigate();

  // Kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa thì yêu cầu đăng nhập
  if (!user) {
    // Điều hướng đến trang login nếu chưa đăng nhập
    navigate("/login");
    return null; // Không render gì khi người dùng chưa đăng nhập
  }

  return (
    <div className="layout">
      <Header />
      <HeroSection />
      <SearchBar />
      <HomePageLayout />
      <InfoSection />
      <Footer />
    </div>
  );
};

export default HomePage;
