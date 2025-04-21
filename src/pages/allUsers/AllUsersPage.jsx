import React, { useState, useEffect } from "react";
import { Table, Space, Button, Popconfirm, message } from "antd";
import { StopOutlined } from "@ant-design/icons";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./AllUsersPage.scss";

const AllUsersPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/Accounts");
        const users = response.data
          .filter((user) => user.roleId === 3 && user.isActive) // Lọc roleId: 3 và isActive: true
          .map((user) => ({
            key: user.id.toString(),
            id: user.id,
            user: user.userName,
            email: user.email,
            phone: user.phone,
            roleId: user.roleId,
            isActive: user.isActive,
          }));
        setUserData(users);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        setError("Không thể tải danh sách người dùng");
      }
    };
    fetchUsers();
  }, []);

  const handleDeactivate = async (record) => {
    try {
      const payload = {
        userName: record.user,
        email: record.email,
        phone: record.phone,
        roleId: record.roleId,
        isActive: false, // Đặt isActive thành false để vô hiệu hóa
      };

      const response = await axios.put(`https://exe201tourbook.azurewebsites.net/api/Accounts/deactivate/${record.id}`, payload);
      if (response.status === 200 || response.data.message === "Account deactivated successfully.") {
        setUserData((prevData) => prevData.filter((user) => user.id !== record.id)); // Loại bỏ tài khoản khỏi danh sách
        message.success("Đã vô hiệu hóa tài khoản thành công!");
      } else {
        throw new Error("Vô hiệu hóa tài khoản thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi vô hiệu hóa tài khoản:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      message.error(`Không thể vô hiệu hóa tài khoản: ${errorMessage}`);
    }
  };

  const userColumns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text) => <span>{text}</span>, // Bỏ hình ảnh, chỉ hiển thị tên người dùng
    },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "roleId", key: "roleId" },
    {
      title: "Vô Hiệu Hóa",
      key: "deactivate",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn vô hiệu hóa tài khoản này?"
          onConfirm={() => handleDeactivate(record)}
          okText="Có"
          cancelText="Không"
        >
          <Button type="link" icon={<StopOutlined />} danger />
        </Popconfirm>
      ),
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
        <h1>Chi Tiết Người Dùng</h1>
        {error && <div className="error-message">{error}</div>}
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