import React, { useState } from "react";
import "./TourSchedule.scss";

const TourSchedule = () => {
  const [activeTab, setActiveTab] = useState("Lịch trình");

  const renderContent = () => {
    switch (activeTab) {
      case "Lịch trình":
        return (
          <div className="tour-schedule__left">
            <h3>Ngày 1: Khởi hành Tour Săn Mây Đà Lạt</h3>
            <p>⏰ 05:00 - Xe và HDV đón khách tại điểm hẹn tại TP. Hồ Chí Minh. Khởi hành đi Đà Lạt.</p>
            <p>🚍 08:00 - Dừng chân ăn sáng tại nhà hàng, thưởng thức đặc sản địa phương.</p>
            <p>📍 11:30 - Tham quan Quảng trường Lâm Viên, chụp hình check-in tại Hoa Dã Quỳ khổng lồ.</p>
            <p>🍽 12:30 - Dùng cơm trưa tại nhà hàng, nhận phòng khách sạn, nghỉ ngơi.</p>
            <p>🌄 15:00 - Khám phá Thác Pongour – một trong những thác nước đẹp nhất Tây Nguyên.</p>
            <p>🌇 18:00 - Dùng bữa tối với lẩu gà lá é, tự do tham quan chợ đêm Đà Lạt.</p>

            <h3>Ngày 2: Săn mây – Tham quan Đà Lạt</h3>
            <p>⏰ 04:30 - Khởi hành đi đồi chè Cầu Đất, săn mây, đón bình minh.</p>
            <p>☕ 07:00 - Thưởng thức cà phê tại quán cafe trên đồi, chụp hình check-in.</p>
            <p>🏞 09:00 - Tham quan Làng Cù Lần, trải nghiệm không gian núi rừng.</p>
            <p>🍽 12:00 - Dùng cơm trưa, nghỉ ngơi tại khách sạn.</p>
            <p>🏡 15:00 - Tham quan Fresh Garden, chiêm ngưỡng vườn hoa khổng lồ.</p>
            <p>🔥 18:30 - Tham gia tiệc BBQ ngoài trời, giao lưu văn nghệ cồng chiêng.</p>

            <h3>Ngày 3: Thư giãn và trở về</h3>
            <p>⏰ 07:00 - Dùng điểm tâm sáng, làm thủ tục trả phòng.</p>
            <p>🏯 09:00 - Tham quan Chùa Linh Phước – Chùa Ve Chai độc đáo.</p>
            <p>🚍 12:00 - Dùng cơm trưa, khởi hành về TP. Hồ Chí Minh.</p>
            <p>🏠 19:00 - Về đến TP.HCM, kết thúc tour, hẹn gặp lại quý khách.</p>
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
            <p>⭐⭐⭐⭐⭐ "Chuyến đi tuyệt vời, săn mây cực đẹp, hướng dẫn viên nhiệt tình!"</p>
            <p>⭐⭐⭐⭐ "Lịch trình hợp lý, thức ăn ngon, khách sạn sạch sẽ."</p>
            <p>⭐⭐⭐⭐⭐ "BBQ và giao lưu cồng chiêng rất thú vị, chắc chắn sẽ quay lại!"</p>
          </div>
        );

      default:
        return null;
    }
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

        {/* Thông tin bên phải */}
        <div className="tour-schedule__right">
          <h4 className="tour-price">1.999.000đ / Người</h4>
          <div className="tour-info">
            <p>🕒 Thời gian: 3 ngày 2 đêm</p>
            <p>🚍 Phương tiện: Xe du lịch</p>
            <p>📅 Ngày khởi hành: 22/1, 23/1, 24/1</p>
          </div>
          <button className="tour-schedule__button">Đặt tour</button>
        </div>
      </div>
    </div>
  );
};

export default TourSchedule;
