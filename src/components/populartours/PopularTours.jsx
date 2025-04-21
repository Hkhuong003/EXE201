import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Space, Pagination } from "antd";
import { ClockCircleOutlined, CarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PopularTours.scss";

const { Title, Text } = Typography;

const PopularTour = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(3); // Số mục mỗi trang, đổi thành 3

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/packages");
        const activeTours = response.data.filter((tour) => tour.isActive);
        setTours(activeTours);
        console.log("Danh sách gói tour:", JSON.stringify(activeTours, null, 2));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói tour:", error);
        setError("Không thể tải danh sách gói tour. Vui lòng thử lại.");
      }
    };
    fetchTours();
  }, []);

  const handleCardClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  // Xử lý khi thay đổi trang hoặc số mục mỗi trang
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Tính toán danh sách tours hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedTours = tours.slice(startIndex, endIndex);

  if (error) {
    return <div className="popular-tour">{error}</div>;
  }

  return (
    <div className="popular-tour">
      {tours.length === 0 ? (
        <div>Không có gói tour nào để hiển thị.</div>
      ) : (
        <>
          {displayedTours.map((tour) => (
            <Card key={tour.id} className="tour-card" onClick={() => handleCardClick(tour.id)}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={6} sm={5} md={4}>
                  <img
                    src={tour.pictureUrl || "https://via.placeholder.com/150"}
                    alt={tour.name}
                    className="tour-image"
                  />
                </Col>
                <Col xs={18} sm={19} md={20} className="tour-info">
                  <Title level={5} className="tour-title">{tour.name}</Title>
                  <Space direction="vertical" size="small">
                    <Text>
                      <ClockCircleOutlined /> Thời gian: 3 ngày 2 đêm {/* Giả định */}
                    </Text>
                    <Text>
                      <CarOutlined /> Phương tiện: Xe du lịch
                    </Text>
                    <Text>
                      <strong>Giá:</strong> {tour.price.toLocaleString("vi-VN")}đ / Người
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          ))}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={tours.length}
              onChange={handlePaginationChange}
              showSizeChanger
              pageSizeOptions={["3", "6", "9"]} // Cập nhật tùy chọn để đồng bộ với pageSize mặc định
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PopularTour;