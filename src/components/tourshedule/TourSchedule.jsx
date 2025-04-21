import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TourSchedule.scss";
import ReviewForm from "../reviewForm/ReviewForm";

const TourSchedule = () => {
  const { id: packageId } = useParams();
  const [activeTab, setActiveTab] = useState("Lịch trình");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [packageData, setPackageData] = useState(null); // State để lưu dữ liệu package

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://exe201tourbook.azurewebsites.net/api/reviews/package/${packageId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá:", error);
        setError("Không thể tải đánh giá.");
      }
    };

    const fetchPackage = async () => {
      try {
        const response = await axios.get(`https://exe201tourbook.azurewebsites.net/api/packages/${packageId}`);
        setPackageData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin package:", error);
        setError("Không thể tải thông tin package.");
      }
    };

    if (packageId) {
      fetchReviews();
      fetchPackage();
    }
  }, [packageId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const accountId = localStorage.getItem("accountId");
    if (!accountId || isNaN(parseInt(accountId))) {
      setSubmitError("Vui lòng đăng nhập để gửi đánh giá.");
      return;
    }

    // Tạo entity cho body
    const reviewData = {
      accountId: accountId,
      packageId: packageId,
      rating:rating,
      comment:comment,
      createDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(
        "https://exe201tourbook.azurewebsites.net/api/reviews",
        reviewData
      );

      if (response.data.message === "Review created successfully.") {
        setSubmitSuccess("Gửi đánh giá thành công!");
        setComment("");
        setRating(5);

        const updatedReviews = await axios.get(`https://exe201tourbook.azurewebsites.net/api/reviews/package/${packageId}`);
        setReviews(updatedReviews.data);
      } else {
        throw new Error("Gửi đánh giá thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      setSubmitError("Gửi đánh giá thất bại. Vui lòng thử lại.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Lịch trình":
        return (
          <div className="tour-schedule__left">
            <h3>Ngày 1: Khởi hành và Tham quan</h3>
            <p>⏰ 05:00 - Xe và HDV đón khách tại điểm hẹn. Khởi hành đến điểm đến.</p>
            <p>🚍 08:00 - Dừng chân ăn sáng tại nhà hàng, thưởng thức đặc sản địa phương.</p>
            <p>📍 11:30 - Tham quan một địa điểm nổi tiếng, chụp hình check-in tại khu vực đặc trưng.</p>
            <p>🍽 12:30 - Dùng cơm trưa tại nhà hàng, nhận phòng khách sạn, nghỉ ngơi.</p>
            <p>🌄 15:00 - Khám phá một địa danh thiên nhiên nổi bật, tận hưởng cảnh đẹp.</p>
            <p>🌇 18:00 - Dùng bữa tối với món ăn đặc sản, tự do khám phá khu vực vào buổi tối.</p>

            <h3>Ngày 2: Khám phá và Trải nghiệm</h3>
            <p>⏰ 04:30 - Khởi hành sớm để ngắm cảnh thiên nhiên, đón bình minh.</p>
            <p>☕ 07:00 - Thưởng thức đồ uống tại một quán nổi tiếng, chụp hình lưu niệm.</p>
            <p>🏞 09:00 - Tham quan một khu vực thiên nhiên hoặc làng văn hóa, trải nghiệm không gian độc đáo.</p>
            <p>🍽 12:00 - Dùng cơm trưa, nghỉ ngơi tại khách sạn.</p>
            <p>🏡 15:00 - Tham quan một điểm đến nổi bật, khám phá vẻ đẹp địa phương.</p>
            <p>🔥 18:30 - Tham gia hoạt động giao lưu văn hóa hoặc tiệc ngoài trời, tận hưởng không khí vui vẻ.</p>

            <h3>Ngày 3: Tham quan và Trở về</h3>
            <p>⏰ 07:00 - Dùng điểm tâm sáng, làm thủ tục trả phòng.</p>
            <p>🏯 09:00 - Tham quan một địa điểm văn hóa hoặc tâm linh nổi tiếng.</p>
            <p>🚍 12:00 - Dùng cơm trưa, khởi hành trở về điểm xuất phát.</p>
            <p>🏠 19:00 - Về đến điểm xuất phát, kết thúc tour, hẹn gặp lại quý khách.</p>
          </div>
        );

      case "Điều kiện":
        return (
          <div className="tour-schedule__left">
            <h3>Điều kiện tour</h3>
            <p>- Giá tour bao gồm xe đưa đón, khách sạn 3 sao và ăn uống theo lịch trình.</p>
            <p>- Hủy trước 7 ngày được hoàn 50% phí tour.</p>
            <p>- Hướng dẫn viên chuyên nghiệp đi kèm suốt hành trình.</p>
            <p>- Miễn phí vé vào cổng các địa điểm tham quan.</p>
          </div>
        );

      case "Đánh giá":
        return (
          <div className="tour-schedule__left">
            <h3>Đánh giá từ khách hàng</h3>
            {error ? (
              <p className="error-message">{error}</p>
            ) : reviews.length === 0 ? (
              <p>Chưa có đánh giá nào.</p>
            ) : (
              reviews.map((review) => (
                <p key={review.id} className="review-item">
                  <span className="review-rating">
                    {"⭐".repeat(review.rating)}
                  </span>{" "}
                  "{review.comment}" <br />
                  <span className="review-date">
                    {new Date(review.createDate).toLocaleDateString("vi-VN")}
                  </span>
                </p>
              ))
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const renderRightContent = () => {
    if (activeTab === 'Đánh giá') {
      return (
        <ReviewForm
          packageId={packageId}
          onReviewSubmitted={async () => {
            try {
              const response = await axios.get(
                `https://exe201tourbook.azurewebsites.net/api/reviews/package/${packageId}`
              );
              setReviews(response.data);
            } catch (error) {
              console.error('Lỗi khi làm mới danh sách reviews:', error);
              setError('Không thể làm mới danh sách reviews.');
            }
          }}
        />
      );
    }

    return (
      <div className="tour-schedule__right">
        <h4 className="tour-price">
          {packageData ? `${packageData.price.toLocaleString("vi-VN")}đ / Người` : "Đang tải..."}
        </h4>
        <div className="tour-info">
          <p>🕒 Thời gian: 3 ngày 2 đêm</p>
          <p>🚍 Phương tiện: Xe du lịch</p>
          <p>📅 Ngày khởi hành: 22/1, 23/1, 24/1</p>
        </div>
        <button className="tour-schedule__button">Đặt tour</button>
      </div>
    );
  };

  return (
    <div className="tour-schedule">
      {/* Tabs */}
      <div className="tour-schedule__tabs">
        {["Lịch trình", "Điều kiện", "Đánh giá"].map((tab, index) => (
          <div
            key={index}
            className={`tour-schedule__tabs-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Nội dung theo tab */}
      <div className="tour-schedule__content">
        {renderContent()}
        {renderRightContent()}
      </div>
    </div>
  );
};

export default TourSchedule;
