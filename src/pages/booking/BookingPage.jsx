import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./BookingPage.scss";

const BookingPage = () => {
  const navigate = useNavigate(); // Hook để điều hướng trang

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
    vehicle: "",
    quantity: "1",
    subscribe: false,
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đã gửi:", formData);

    // ✅ Chuyển sang trang thanh toán sau khi đặt vé
    navigate("/checkout", { state: formData }); 
  };

  return (
    <div className="booking-page">
      <h2>Vui lòng điền thông tin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-item">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email..."
            />
          </div>
          <div className="form-item">
            <label>SDT</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại..."
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            Gửi cho tôi tin tức qua email
          </label>
        </div>

        <div className="form-group">
          <div className="form-item">
            <label>HỌ TÊN NGƯỜI ĐẶT</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ tên..."
            />
          </div>
          <div className="form-item">
            <label>PHƯƠNG TIỆN</label>
            <input
              type="text"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              placeholder="Nhập phương tiện..."
            />
          </div>
        </div>

        <div className="form-group">
          <label>ĐỊA CHỈ</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ..."
          />
        </div>

        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
            />
            Lưu lại thông tin cho lần sau
          </label>
        </div>

        <button type="submit">Đặt ngay</button>
      </form>
    </div>
  );
};

export default BookingPage;
