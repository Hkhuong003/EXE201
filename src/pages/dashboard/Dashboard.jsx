import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import axios from "axios";
import "./Dashboard.scss";

const AdminDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/reviews");
        // Lọc reviews có isActive: true
        const activeReviews = response.data.filter(review => review.isActive === true);
        setReviews(activeReviews);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách reviews:", error);
        message.error("Không thể tải danh sách reviews.");
      }
    };
    fetchReviews();
  }, []);

  const handleDeactivate = async (reviewId) => {
    try {
      await axios.put(`https://exe201tourbook.azurewebsites.net/api/reviews/deactivate/${reviewId}`); // Thay POST thành PUT
      message.success("Deactivate review thành công!");
      // Cập nhật danh sách reviews sau khi deactivate
      const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/reviews");
      const activeReviews = response.data.filter(review => review.isActive === true);
      setReviews(activeReviews);
    } catch (error) {
      console.error("Lỗi khi deactivate review:", error);
      message.error("Deactivate review thất bại.");
    }
  };

  const reviewColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Account ID", dataIndex: "accountId", key: "accountId" },
    { title: "Package ID", dataIndex: "packageId", key: "packageId" },
    { 
      title: "Rating", 
      dataIndex: "rating", 
      key: "rating", 
      render: (rating) => <span>{rating} sao</span> 
    },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    { 
      title: "Create Date", 
      dataIndex: "createDate", 
      key: "createDate", 
      render: (date) => new Date(date).toLocaleDateString("vi-VN") 
    },
    { 
      title: "Action", 
      key: "action", 
      render: (_, record) => (
        <Button 
          type="primary" 
          danger 
          onClick={() => handleDeactivate(record.id)}
        >
          Deactivate
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-dashboard">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <div className="user-details">
          <h3>Reviews</h3>
          <Table columns={reviewColumns} dataSource={reviews} pagination={false} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;