import React, { useState } from "react";
import { Avatar, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar/Sidebar";
import "./AdminHeader.scss";

const AdminHeader = ({ onSidebarMouseEnter, onSidebarMouseLeave, sidebarVisible }) => {
  const [notificationCount] = useState(3);

  const handleMenuClick = ({ key }) => {
    if (key === "profile") {
      console.log("Navigate to Profile");
    } else if (key === "logout") {
      console.log("Logout");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <div className="admin-header">
      <div
        className="dashboard-title"
        onMouseEnter={onSidebarMouseEnter}
      >
        Dashboard
      </div>

      <div className="header-right">
        <Badge count={notificationCount} size="small">
          <BellOutlined className="notification-icon" />
        </Badge>

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