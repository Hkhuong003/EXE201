import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookingPage.scss";

// Mô phỏng lấy user ID (thay bằng logic xác thực thực tế)
const getUserId = () => {
  return parseInt(localStorage.getItem("userId")) || 1; // Mặc định là 1
};

const BookingPage = () => {
  const navigate = useNavigate();
  const { id: packageId } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    quantity: "1",
  });
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchServicesForPackage = async () => {
      try {
        const servicesResponse = await fetch(`https://exe201tourbook.azurewebsites.net/api/Service/${packageId}/services`);
        if (!servicesResponse.ok) {
          throw new Error("Không thể lấy danh sách dịch vụ cho gói tour");
        }
        const servicesData = await servicesResponse.json();
        setServices(servicesData.filter((service) => service.isActive));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setError(error.message);
      }
    };
    fetchServicesForPackage();
  }, [packageId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalPrice = () => {
    const quantity = parseInt(formData.quantity);
    const servicesTotal = services.reduce((sum, service) => sum + service.price, 0);
    return servicesTotal * quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!packageId || isNaN(packageId)) {
      setError("ID gói không hợp lệ");
      return;
    }

    const bookingData = {
      accountId: getUserId(),
      description: `Đặt vé bởi ${formData.fullName} cho ${formData.quantity} vé (Gói ${packageId})`,
      bookingDate: new Date().toISOString(),
    };

    try {
      // Bước 1: Tạo booking
      const bookingResponse = await fetch("https://exe201tourbook.azurewebsites.net/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(`Không thể tạo booking: ${errorData.message || bookingResponse.statusText}`);
      }
      const bookingResult = await bookingResponse.json();
      console.log("Phản hồi API booking:", JSON.stringify(bookingResult, null, 2));

      // Lấy bookingId từ trường bookingId
      const bookingId = bookingResult.bookingId;
      if (!bookingId) {
        throw new Error("Không tìm thấy bookingId trong phản hồi API. Kiểm tra cấu trúc phản hồi ở console.");
      }

      // Bước 2: Tạo booking detail cho từng service
        const bookingDetailData = {
          bookingId: bookingId,
          packageId: packageId,
        };
        const detailResponse = await fetch("https://exe201tourbook.azurewebsites.net/api/BookingDetail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetailData),
        });
        if (!detailResponse.ok) {
          const detailError = await detailResponse.json();
          throw new Error(`Không thể tạo booking detail cho dịch vụ ${service.id}: ${detailError.message || detailResponse.statusText}`);
        } else {
          const detailResult = await detailResponse.json();
          console.log("Phản hồi API booking detail:", JSON.stringify(detailResult, null, 2));
        }
      
      // Bước 3: Gọi API PayOS để tạo thanh toán
      const payOSResponse = await fetch(`https://exe201tourbook.azurewebsites.net/api/PayOS/create-payment/${bookingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}) // Giả định không cần payload, điều chỉnh nếu cần
      });
      if (!payOSResponse.ok) {
        const payOSError = await payOSResponse.json();
        throw new Error(`Không thể tạo thanh toán PayOS: ${payOSError.message || payOSResponse.statusText}`);
      }
      const payOSResult = await payOSResponse.json();
      console.log("Phản hồi API PayOS:", JSON.stringify(payOSResult, null, 2));

      // Bước 4: Chuyển hướng đến checkoutUrl
      const checkoutUrl = payOSResult.checkoutUrl;
      if (!checkoutUrl) {
        throw new Error("Không tìm thấy checkoutUrl trong phản hồi PayOS.");
      }
      window.location.href = checkoutUrl; // Chuyển hướng trình duyệt đến PayOS

    } catch (error) {
      console.error("Lỗi khi đặt vé:", error);
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="booking-page">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
      </div>
    );
  }

  if (!services.length) {
    return <div className="booking-page">Đang tải...</div>;
  }

  return (
    <div className="booking-page">
      <h2>Đặt Vé</h2>
      {success && <div className="success-message">{success}</div>}
      <p>Dịch vụ bao gồm:</p>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            {service.name}: {service.price.toLocaleString("vi-VN")}đ
          </li>
        ))}
      </ul>
      <p>Tổng giá: {calculateTotalPrice().toLocaleString("vi-VN")}đ</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Họ Tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ tên..."
            required
          />
        </div>
        <div className="form-group">
          <label>Số Lượng</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit">Đặt Ngay</button>
      </form>
    </div>
  );
};

export default BookingPage;