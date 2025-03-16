import React from "react";
import { ClockCircleOutlined, CarOutlined } from "@ant-design/icons"; // Import icon từ Ant Design
import "./TourCard.scss";

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card">
      {/* Hình ảnh bên trái */}
      <div className="tour-image-container">
        <img className="tour-image" src={tour.image} alt={tour.title} />
      </div>

      {/* Nội dung bên phải */}
      <div className="tour-content">
        <h3 className="tour-title">{tour.title}</h3>

        <div className="tour-info">
          <p className="tour-duration">
            <ClockCircleOutlined className="icon" />
            Thời gian: {tour.duration}
          </p>
          <p className="tour-dates">
            Khởi hành:
            <span className="date-badge">{tour.startDate}</span>
            <span className="date-badge">{tour.endDate}</span>
          </p>
          <p className="tour-transport">
            <CarOutlined className="icon" />
            Phương tiện: {tour.transport}
          </p>
        </div>

        {/* Nút Xem Chi Tiết */}
        <div className="button-container">
          <button className="view-button">Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
