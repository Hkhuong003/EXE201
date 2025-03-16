import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import { ClockCircleOutlined, CalendarOutlined, CarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PopularTours.scss";

const { Title, Text } = Typography;

const tours = [
  {
    id: 1, // Thêm ID cho từng tour
    title: "Tour Đà Lạt 3 ngày 2 đêm",
    image: "https://s3-alpha-sig.figma.com/img/81a9/6acd/de6e2cee382797148d6ee02fc9770e0f",
    dates: ["22/1", "23/1", "24/1"]
  },
  {
    id: 2,
    title: "Tour Sapa 4 ngày 3 đêm",
    image: "https://s3-alpha-sig.figma.com/img/81a9/6acd/de6e2cee382797148d6ee02fc9770e0f",
    dates: ["10/2", "15/2", "20/2"]
  }
];

const PopularTour = () => {
  const navigate = useNavigate(); // Hook điều hướng

  const handleCardClick = (tourId) => {
    navigate(`/tour/${tourId}`); // Điều hướng đến trang chi tiết của tour
  };

  return (
    <div className="popular-tour">
      <div className="tour-sort">
        <Text strong>Sắp xếp:</Text>
        <a href="#">[ Ngày gần nhất ]</a>
        <a href="#">[ Hấp dẫn nhất ]</a>
      </div>

      {tours.map((tour) => (
        <Card key={tour.id} className="tour-card" onClick={() => handleCardClick(tour.id)}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={6} sm={5} md={4}>
              <img src={tour.image} alt={tour.title} className="tour-image" />
            </Col>
            <Col xs={18} sm={19} md={20} className="tour-info">
              <Title level={5} className="tour-title">{tour.title}</Title>
              <Space direction="vertical" size="small">
                <Text><ClockCircleOutlined /> Thời gian: 3 ngày 2 đêm</Text>
                <Text>
                  <CalendarOutlined /> Khởi hành:{" "}
                  {tour.dates.map((date, i) => (
                    <span key={i} className="tour-date">{date}{i < tour.dates.length - 1 ? ", " : ""}</span>
                  ))}
                </Text>
                <Text><CarOutlined /> Phương tiện: Xe du lịch</Text>
              </Space>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default PopularTour;
