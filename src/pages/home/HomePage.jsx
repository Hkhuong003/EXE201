import React, { useEffect } from "react";
import Header from "../../components/header/Header";
import HeroSection from "../../components/herosection/HeroSection";
import SearchBar from "../../components/searchbar/SearchBar";
import HomePageLayout from "../../components/homepagelayout/HomePageLayout";
import InfoSection from "../../components/infosection/InfoSection";
import Footer from "../../components/footer/Footer";
import { useAuth } from "../../contexts/AuthContext"; // Import AuthContext to get user info
import { useNavigate } from "react-router-dom"; // Use navigate to redirect

import "./HomePage.scss";

const HomePage = () => {
  const { user } = useAuth();  // Get user info from context
  const navigate = useNavigate();

  // useEffect to handle navigation after the component has mounted
  useEffect(() => {
    if (user && user.role === "admin") {
      // If the user is admin, redirect to the admin dashboard
      navigate("/adminDashboard");
    }
  }, [user, navigate]);  // Re-run this effect when the user changes

  // Handle booking tour action
  const handleBooking = () => {
    if (!user) {
      // If the user is not logged in, redirect to login
      navigate("/login");
    } else {
      // Proceed with booking logic (if the user is logged in)
      console.log("Booking tour...");
    }
  };

  return (
    <div className="layout">
      <Header />
      <HeroSection />
      <SearchBar />
      <HomePageLayout />
      <InfoSection />
      <Footer />
      
      {/* Example button for booking tour */}
      <button onClick={handleBooking}>Book a Tour</button>
    </div>
  );
};

export default HomePage;
