import React from "react";
import Header from "../../components/header/Header"; // Giả sử bạn đã có Header
import Footer from "../../components/footer/Footer"; // Giả sử bạn đã có Footer
import comingSoonImage from "../../assets/coming-soon.png"; // Đường dẫn đến hình Coming Soon
import "./AboutUs.scss";

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <Header />
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>Welcome to Historical Tourism! "See the World Through Historical Eyes!"</p>
        <div className="coming-soon">
          <img src={comingSoonImage} alt="Coming Soon" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;