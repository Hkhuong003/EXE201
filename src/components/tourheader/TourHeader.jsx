import React from "react";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined, CalendarOutlined, CarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "./TourHeader.scss";

const TourHeader = () => {
  const navigate = useNavigate(); // Hook để chuyển trang

  const tourData = {
    title: "Tour Đà Lạt 3 ngày 2 đêm",
    image: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-da-lat-36.jpg",
    price: "1.999.000đ",
    duration: "3 ngày 2 đêm",
    departureDates: ["22/1", "23/1", "24/1"],
    vehicle: "Xe du lịch",
  };

  // Xử lý khi bấm "Đặt tour"
  const handleBooking = () => {
    navigate("/booking"); // Chuyển đến trang booking
  };

  return (
    <div className="tour-header">
      <div className="tour-header__left">
        <img src={tourData.image} alt={tourData.title} className="tour-header__image" />
      </div>
      <div className="tour-header__right">
        <h2 className="tour-header__title">{tourData.title}</h2>

        <div className="tour-header__info">
          <p>
            <ClockCircleOutlined style={{ marginRight: 8 }} />
            <strong>Thời gian:</strong> {tourData.duration}
          </p>
          <p>
            <CalendarOutlined style={{ marginRight: 8 }} />
            <strong>Khởi hành:</strong>{" "}
            {tourData.departureDates.map((date, index) => (
              <span key={index} className="tour-header__date">
                {date}
              </span>
            ))}
          </p>
          <p>
            <CarOutlined style={{ marginRight: 8 }} />
            <strong>Phương tiện:</strong> {tourData.vehicle}
          </p>
        </div>

        <p className="tour-header__price">
          <strong>{tourData.price} / Người</strong>
        </p>

        <Button type="primary" size="large" className="tour-header__button" onClick={handleBooking}>
          Đặt tour
        </Button>
      </div>
    </div>
  );
};

export default TourHeader;
