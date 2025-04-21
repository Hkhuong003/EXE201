import React, { useState, useEffect } from "react";
import { Table, message, Tag, Select, Space } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import axios from "axios";
import "./BookingHistoryPage.scss";

const { Option } = Select;

const BookingHistoryPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All"); // State để lọc theo status

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/bookings");
        if (Array.isArray(response.data)) {
          setBookings(response.data);
          setFilteredBookings(response.data); // Ban đầu hiển thị tất cả bookings
        } else {
          setBookings([]);
          setFilteredBookings([]);
          setError("Dữ liệu bookings không đúng định dạng.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bookings:", error);
        setError("Không thể tải danh sách bookings. Vui lòng thử lại sau.");
        setBookings([]);
        setFilteredBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Hàm lọc bookings theo status
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    if (value === "All") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === value));
    }
  };

  const bookingColumns = [
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description" 
    },
    { 
      title: "Booking Date", 
      dataIndex: "bookingDate", 
      key: "bookingDate", 
      render: (date) => date ? new Date(date).toLocaleDateString("vi-VN") : "N/A" 
    },
    { 
      title: "Total Price", 
      dataIndex: "totalPrice", 
      key: "totalPrice", 
      render: (price) => price ? `${price.toLocaleString("vi-VN")}đ` : "N/A" 
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status", 
      render: (status) => {
        let color = "default";
        if (status === "Confirmed") color = "green";
        if (status === "PENDING") color = "orange";
        if (status === "CANCELLED") color = "red";
        return <Tag color={color}>{status}</Tag>;
      }
    },
  ];

  return (
    <div className="booking-history-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <div className="booking-details">
          <h3>Booking History</h3>
          <Space style={{ marginBottom: 16 }}>
            <span>Lọc theo trạng thái:</span>
            <Select 
              value={statusFilter} 
              onChange={handleStatusFilterChange} 
              style={{ width: 150 }}
            >
              <Option value="All">Tất cả</Option>
              <Option value="Confirmed">Confirmed</Option>
              <Option value="PENDING">PENDING</Option>
              <Option value="CANCELLED">CANCELLED</Option>
            </Select>
          </Space>
          {isLoading ? (
            <p>Đang tải dữ liệu...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : filteredBookings.length === 0 ? (
            <p>Không có bookings nào.</p>
          ) : (
            <Table 
              columns={bookingColumns} 
              dataSource={filteredBookings} 
              pagination={{ 
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "50"],
              }} 
              rowKey={(record) => record.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryPage;