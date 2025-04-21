import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { StarFilled, CarOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import "./TourHeader.scss";

const TourHeader = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [tourData, setTourData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      if (!id) {
        setError("Tour ID is missing");
        return;
      }
      try {
        const response = await axios.get(`https://exe201tourbook.azurewebsites.net/api/packages/${id}`);
        const tour = response.data;
        setTourData({
          title: tour.name,
          description: tour.description,
          price: `${tour.price.toLocaleString("vi-VN")}đ`, // Định dạng giá chuẩn Việt Nam
          rating: tour.rating,
          image: tour.pictureUrl || "src/assets/background.png",
          vehicle: "Xe du lịch",
        });
      } catch (error) {
        console.error("Error fetching tour:", error);
        setError("Failed to load tour data");
      }
    };
    fetchTour();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/booking/${id}`); // Chuyển hướng đến booking với packageId
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFilled key={i} style={{ color: "#fadb14", fontSize: "16px" }} />);
    }
    if (hasHalfStar) {
      stars.push(
        <StarFilled
          key="half"
          style={{ color: "#fadb14", fontSize: "16px", opacity: 0.5 }}
        />
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarFilled key={i} style={{ color: "#d9d9d9", fontSize: "16px" }} />);
    }

    return stars;
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!tourData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tour-header">
      <div className="tour-header__left">
        <img src={tourData.image} alt={tourData.title} className="tour-header__image" />
      </div>
      <div className="tour-header__right">
        <h2 className="tour-header__title">{tourData.title}</h2>
        <div className="tour-header__info">
          <p>
            <strong>Mô tả:</strong> {tourData.description}
          </p>
          <p>
            <strong>Giá:</strong> {tourData.price} / Người
          </p>
          <p>
            <CarOutlined />
            <strong>Phương tiện:</strong> {tourData.vehicle}
          </p>
          <p>
            <strong>Đánh giá:</strong>{" "}
            <span className="tour-header__rating">{renderStars(tourData.rating)}</span>
          </p>
        </div>
        <Button type="primary" size="large" className="tour-header__button" onClick={handleBooking}>
          Đặt tour
        </Button>
      </div>
    </div>
  );
};

export default TourHeader;