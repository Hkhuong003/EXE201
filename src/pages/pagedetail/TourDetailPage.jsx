import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import TourHeader from "../../components/tourheader/TourHeader";
import TourSchedule from "../../components/tourshedule/TourSchedule";
import InfoSection from "../../components/infosection/InfoSection";
import axios from "axios";
import "./TourDetailPage.scss";

const TourDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          id: tour.id,
          title: tour.name,
          description: tour.description,
          price: `${tour.price.toLocaleString("vi-VN")}đ`,
          rating: tour.rating,
          image: tour.pictureUrl || "/images/tour-main.jpg",
          schedule: tour.itineraries || [ // Sửa itinerary thành itineraries (theo cấu trúc API)
            { title: "Ngày 1: Khởi hành", description: "Khởi hành từ TP.HCM..." },
            { title: "Ngày 2: Tham quan", description: "Tham quan thành phố..." },
            { title: "Ngày 3: Kết thúc", description: "Trở về điểm xuất phát..." },
          ],
        });
        console.log("Dữ liệu gói tour:", JSON.stringify(tour, null, 2)); // Log dữ liệu để kiểm tra
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu gói tour:", error);
        console.log("Toàn bộ phản hồi lỗi:", JSON.stringify(error.response, null, 2));
        const errorMessage = error.response?.data?.message || error.message;
        setError(`Không thể tải dữ liệu gói tour: ${errorMessage}`);
      }
    };
    fetchTour();
  }, [id]);

  if (error) {
    return (
      <div>
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
        <Footer />
      </div>
    );
  }

  if (!tourData) {
    return (
      <div>
        <div>Đang tải...</div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <div className="tour-detail-page">
        <TourHeader />
        <TourSchedule schedule={tourData.schedule} />
        <InfoSection />
      </div>
      <Footer />
    </>
  );
};

export default TourDetailPage;