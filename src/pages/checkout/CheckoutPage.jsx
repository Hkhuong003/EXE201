import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../../components/header/Header"; 
import "./CheckoutPage.scss"; 

const CheckoutPage = () => {
  const navigate = useNavigate(); // Hook điều hướng

  const bookingInfo = {
    tourName: "Tour Đà Lạt (3 ngày 2 đêm)",
    tourType: "Du lịch gia đình",
    imageUrl: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-da-lat-36.jpg",
    duration: "3 ngày 2 đêm",
    departureDate: "22/1",
    transport: "Xe du lịch",
    adultCount: 1,
    customerName: "Trần Thị Bún Riêu",
    phoneNumber: "3264273567245",
    totalPrice: "1.000.000 đ",
  };

  const handleConfirm = () => {
    navigate("/payment"); // Chuyển trang
  };

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <h2 className="title">Thông tin đặt vé</h2>
        <h3 className="tour-name">{bookingInfo.tourName}</h3>
        <p className="tour-type">{bookingInfo.tourType}</p>
        <img src={bookingInfo.imageUrl} alt="Tour" className="tour-image" />
        
        <div className="tour-details">
          <p>⏳ <strong>Thời gian:</strong> {bookingInfo.duration}</p>
          <p>📅 <strong>Khởi hành:</strong> {bookingInfo.departureDate}</p>
          <p>🚌 <strong>Phương tiện:</strong> {bookingInfo.transport}</p>
        </div>

        <div className="customer-info">
          <p><strong>Người lớn:</strong> {bookingInfo.adultCount} người</p>
          <p><strong>Tên người đặt vé:</strong> {bookingInfo.customerName}</p>
          <p><strong>Số điện thoại:</strong> {bookingInfo.phoneNumber}</p>
          <p className="total-price">
            <strong>Tổng giá tiền:</strong> <span className="price">{bookingInfo.totalPrice}</span>
          </p>
        </div>

        <button className="confirm-button" onClick={handleConfirm}>Xác nhận</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
