import React from "react";
import { StarFilled, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./TourCard.scss";

const TourCard = ({ tour }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tour/${tour.id}`);
  };

  return (
    <div className="tour-card">
      <div className="tour-image-container">
        <img className="tour-image" src={tour.image} alt={tour.title} />
      </div>
      <div className="tour-content">
        <h3 className="tour-title">{tour.title}</h3>
        <div className="tour-info">
          <p className="tour-description">
            <EnvironmentOutlined className="icon" />
            {tour.description}
          </p>
          <p className="tour-price">
            Giá: <span className="price-badge">{tour.price.toLocaleString("vi-VN")}đ</span>
          </p>
          <p className="tour-rating">
            <StarFilled className="icon" style={{ color: "#fadb14" }} />
            Đánh giá: {tour.rating}/5
          </p>
        </div>
        <div className="button-container">
          <button className="view-button" onClick={handleViewDetails}>
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;