import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeroSection from "../../components/herosection/HeroSection";
import SearchBar from "../../components/searchbar/SearchBar";
import HomePageLayout from "../../components/homepagelayout/HomePageLayout";
import InfoSection from "../../components/infosection/InfoSection";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import "./HomePage.scss";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Kiểm tra role admin
    if (user && user.role === "1") {
      navigate("/adminDashboard");
    }

    // Xử lý query parameters từ URL redirect PayOS
    const queryParams = new URLSearchParams(location.search);
    const orderCode = queryParams.get("orderCode");

    if (orderCode) {
      const updatePayOS = async () => {
        try {
          const response = await fetch("https://exe201tourbook.azurewebsites.net/api/PayOS/update", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderCode: parseInt(orderCode) }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Không thể cập nhật PayOS: ${errorData.message || response.statusText}`);
          }

          const result = await response.json();
          console.log("Phản hồi API PayOS update:", JSON.stringify(result, null, 2));
          setMessage("Cập nhật thanh toán thành công!");
        } catch (error) {
          console.error("Lỗi khi cập nhật PayOS:", error);
          setMessage(`Lỗi: ${error.message}`);
        }
      };
      updatePayOS();
    }
  }, [user, navigate, location.search]);

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/booking");
    }
  };

  return (
    <div className="layout">
      <HeroSection />
      <SearchBar />
      <HomePageLayout />
      <InfoSection />
      <Footer />
      {message && <div className="payment-message">{message}</div>}
    </div>
  );
};

export default HomePage;