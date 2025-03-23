import React, { useState } from "react";
import { Table, Card, Space } from "antd";
import { BarChartOutlined, DollarOutlined, TeamOutlined, CheckCircleOutlined } from "@ant-design/icons";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import "./Dashboard.scss";

const AdminDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const userColumns = [
    { title: "User", dataIndex: "user", key: "user", render: (text) => <Space><img src="https://via.placeholder.com/30" alt="avatar" style={{ borderRadius: "50%" }} /> {text}</Space> },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Enquiry", dataIndex: "enquiry", key: "enquiry" },
    { title: "Bookings", dataIndex: "bookings", key: "bookings" },
    { title: "Reviews", dataIndex: "reviews", key: "reviews" },
  ];

  const userData = [
    { key: "1", user: "John Doe", name: "John Doe", phone: "(555) 123-4567", email: "johndoe@example.com", enquiry: 2, bookings: 2, reviews: 2 },
    { key: "2", user: "John Doe", name: "John Doe", phone: "(555) 123-4567", email: "johndoe@example.com", enquiry: 2, bookings: 2, reviews: 2 },
    { key: "3", user: "John Doe", name: "John Doe", phone: "(555) 123-4567", email: "johndoe@example.com", enquiry: 2, bookings: 2, reviews: 2 },
    { key: "4", user: "John Doe", name: "John Doe", phone: "(555) 123-4567", email: "johndoe@example.com", enquiry: 2, bookings: 2, reviews: 2 },
  ];

  const bookingColumns = [
    { title: "", dataIndex: "checkbox", key: "checkbox", render: () => <input type="checkbox" /> },
    { title: "Name", dataIndex: "name", key: "name", render: (text) => <Space><img src="https://via.placeholder.com/30" alt="avatar" style={{ borderRadius: "50%" }} /> {text}</Space> },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Enquiry", dataIndex: "enquiry", key: "enquiry" },
  ];

  const bookingData = [
    { key: "1", name: "John Doe", date: "12/02", enquiry: 2 },
    { key: "2", name: "John Doe", date: "12/02", enquiry: 2 },
    { key: "3", name: "John Doe", date: "12/02", enquiry: 2 },
  ];

  const socialMediaColumns = [
    { title: "Social Media", dataIndex: "socialMedia", key: "socialMedia", render: (text) => <Space><img src={text === "Facebook" ? "https://via.placeholder.com/20" : "https://via.placeholder.com/20"} alt="icon" /> {text}</Space> },
    { title: "Share", dataIndex: "share", key: "share" },
    { title: "Like", dataIndex: "like", key: "like" },
  ];

  const socialMediaData = [
    { key: "1", socialMedia: "Facebook", share: "10K", like: "1K" },
    { key: "2", socialMedia: "Tiktok", share: "10K", like: "1K" },
  ];

  return (
    <div className="admin-dashboard">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className="main-content">
        <div className="stats">
          <Card>
            <BarChartOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <div>Today Views</div>
            <div>20,050</div>
          </Card>
          <Card>
            <DollarOutlined style={{ fontSize: "24px", color: "#faad14" }} />
            <div>All Earnings</div>
            <div>20,050</div>
          </Card>
          <Card>
            <TeamOutlined style={{ fontSize: "24px", color: "#ff4d4f" }} />
            <div>Users</div>
            <div>20,050</div>
          </Card>
          <Card>
            <CheckCircleOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
            <div>Enquiry</div>
            <div>20,050</div>
          </Card>
        </div>
        <div className="user-details">
          <h3>User Details</h3>
          <Table columns={userColumns} dataSource={userData} pagination={false} />
        </div>
        <div className="bottom-section">
          <div className="latest-activity">
            <h3>Latest Activity</h3>
            <ul>
              <li>12/02/2025: Check-in sân máy bay Đội Thiên Phước Đức</li>
              <li>12/02/2025: Check-in sân máy bay Đội Thiên Phước Đức</li>
              <li>12/02/2025: Check-in sân máy bay Đội Thiên Phước Đức</li>
              <li>12/02/2025: Check-in sân máy bay Đội Thiên Phước Đức</li>
            </ul>
          </div>
          <div className="booking-social">
            <div className="booking">
              <h3>Booking</h3>
              <Table columns={bookingColumns} dataSource={bookingData} pagination={false} />
            </div>
            <div className="social-media">
              <h3>Social Media</h3>
              <Table columns={socialMediaColumns} dataSource={socialMediaData} pagination={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;