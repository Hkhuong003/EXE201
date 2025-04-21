import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.scss";

const AdminHeader = ({ onSidebarMouseEnter, onSidebarMouseLeave, sidebarVisible }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      navigate("/login"); // Chuyển hướng về trang đăng nhập
    }
  };

  const handleDashboardClick = () => {
    navigate("/adminDashboard"); // Chuyển hướng về trang /adminDashboard
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="admin-header">
      <div
        className="dashboard-title"
        onMouseEnter={onSidebarMouseEnter}
        onClick={handleDashboardClick} // Thêm sự kiện onClick để điều hướng
        style={{ cursor: "pointer" }} // Thêm con trỏ để người dùng biết có thể nhấn
      >
        Dashboard
      </div>

      <div className="header-right">
        <span>Admin</span>

        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar size={40} icon={<UserOutlined />} className="avatar" />
        </Dropdown>
      </div>

      <div
        className={`sidebar-container ${sidebarVisible ? "show" : ""}`}
        onMouseLeave={onSidebarMouseLeave}
      >
        <Sidebar
          visible={sidebarVisible}
          onMouseEnter={onSidebarMouseEnter}
          onMouseLeave={onSidebarMouseLeave}
        />
      </div>
    </div>
  );
};

export default AdminHeader;