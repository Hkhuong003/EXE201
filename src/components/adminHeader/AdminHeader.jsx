import React, { useState } from "react";
import { Avatar, Dropdown, Menu, Badge } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import Sidebar from "../sidebar/Sidebar";
import "./AdminHeader.scss";

const AdminHeader = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // Giả lập có 3 thông báo

  return (
    <div className="admin-header">
      <div
        className="dashboard-title"
        onMouseEnter={() => setSidebarVisible(true)}
      >
        Dashboard
      </div>

      {/* Header bên phải */}
      <div className="header-right">
        {/* Icon thông báo */}
        <Badge count={notificationCount} size="small">
          <BellOutlined className="notification-icon" />
        </Badge>

        <span>Admin</span>

        {/* Avatar với menu dropdown */}
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Profile</Menu.Item>
              <Menu.Item key="2">Logout</Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar-container ${sidebarVisible ? "show" : ""}`}
        onMouseLeave={() => setSidebarVisible(false)}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminHeader;
