import React, { useState } from "react";
import { Table, Space } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AllUsersPage.scss";

const AllUsersPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const userColumns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text) => (
        <Space>
          <img
            src="https://via.placeholder.com/30"
            alt="avatar"
            style={{ borderRadius: "50%" }}
          />
          {text}
        </Space>
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Enquiry", dataIndex: "enquiry", key: "enquiry" },
    { title: "Bookings", dataIndex: "bookings", key: "bookings" },
    { title: "Reviews", dataIndex: "reviews", key: "reviews" },
  ];

  const userData = [
    {
      key: "1",
      user: "John Doe",
      name: "John Doe",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
      enquiry: 2,
      bookings: 2,
      reviews: 2,
    },
    {
      key: "2",
      user: "John Doe",
      name: "John Doe",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
      enquiry: 2,
      bookings: 2,
      reviews: 2,
    },
    {
      key: "3",
      user: "John Doe",
      name: "John Doe",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
      enquiry: 2,
      bookings: 2,
      reviews: 2,
    },
    {
      key: "4",
      user: "John Doe",
      name: "John Doe",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
      enquiry: 2,
      bookings: 2,
      reviews: 2,
    },
  ];

  return (
    <div className="all-users-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>User Details</h1>
        <Table
          columns={userColumns}
          dataSource={userData}
          pagination={false}
          className="user-table"
        />
      </div>
    </div>
  );
};

export default AllUsersPage;