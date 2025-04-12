import React from "react";
import Header from "../../components/header/Header"; // Giả sử bạn đã có Header
import Footer from "../../components/footer/Footer"; // Giả sử bạn đã có Footer
import comingSoonImage from "../../assets/coming-soon.png"; // Đường dẫn đến hình Coming Soon
import "./NewsPage.scss";

const NewsPage = () => {
  return (
    <div className="news-page">
      <Header />
      <div className="news-content">
        <h1>News</h1>
        <p>Stay updated with the latest news from Historical Tourism!</p>
        <div className="coming-soon">
          <img src={comingSoonImage} alt="Coming Soon" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;