import React, { useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import "./HistoryPage.scss";

const HistoryPage = () => {
  const { user } = useAuth(); // Lấy user từ AuthContext
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    // Lấy accountId từ localStorage
    const userAccountId = localStorage.getItem("accountId");
    if (userAccountId) {
      setAccountId(parseInt(userAccountId));
    } else {
      setError("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
    }
  }, []);

  useEffect(() => {
    // Lắng nghe sự thay đổi của user (đăng nhập/đăng xuất)
    if (!user) {
      // Khi đăng xuất (user là null), xóa bookings
      setBookings([]);
      setError("Vui lòng đăng nhập để xem lịch sử đặt chỗ.");
      return;
    }

    if (accountId) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/bookings");
          const userBookings = response.data.filter(
            (booking) => booking.accountId === accountId
          );
          setBookings(userBookings);
          setError(null);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách đặt chỗ:", error);
          setError("Không thể tải danh sách đặt chỗ.");
        }
      };
      fetchBookings();
    }
  }, [accountId, user]); // Thêm user vào dependency để lắng nghe sự thay đổi

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  const columns = [
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ngày đặt",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text) => new Date(text).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tổng giá (VND)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => price.toLocaleString("vi-VN") + "đ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`status-${status.toLowerCase()}`}>
          {status === "Confirmed" ? "Đã thanh toán" : status}
        </span>
      ),
    },
  ];

  if (error) {
    return <div className="history-page">{error}</div>;
  }

  return (
    <div className="history-page">
      <h2>Lịch sử đặt chỗ</h2>
      {bookings.length === 0 ? (
        <div>Không có đặt chỗ nào để hiển thị.</div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={displayedBookings}
            pagination={false}
            rowKey="id"
            className="history-table"
          />
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={bookings.length}
              onChange={handlePaginationChange}
              showSizeChanger
              pageSizeOptions={["4", "8", "12"]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;