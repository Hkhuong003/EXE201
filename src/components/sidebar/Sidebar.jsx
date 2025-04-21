import React from "react";
import { Menu } from "antd";
import { UserOutlined, FolderOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ visible, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "all-users") navigate("/users");
    if (e.key === "all-tours") navigate("/tours");
    if (e.key === "add-tours") navigate("/tours/add");
    if (e.key === "all-services") navigate("/services");
    if (e.key === "add-service") navigate("/services/add");
    if (e.key === "add-packageservice") navigate("/packageservices/add");
    if (e.key === "booking-history") navigate("/booking-history"); // Thêm điều hướng tới trang Booking History
  };

  return (
    <div className={`sidebar ${visible ? "show" : ""}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["all-users"]}
        defaultOpenKeys={["users", "tours"]}
        style={{ height: "100%", borderRight: 0 }}
        onClick={handleMenuClick}
      >
        <Menu.SubMenu key="users" icon={<UserOutlined />} title="Users">
          <Menu.Item key="all-users">All User</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="tours" icon={<FolderOutlined />} title="Tours Packages">
          <Menu.Item key="all-tours">All Tours Packages</Menu.Item>
          <Menu.Item key="add-tours">Add Tours Packages</Menu.Item>
          <Menu.Item key="all-services">All Services</Menu.Item>
          <Menu.Item key="add-service">Add Service</Menu.Item>
          <Menu.Item key="add-packageservice">Add Service+Package</Menu.Item>
          <Menu.Item key="booking-history">Booking History</Menu.Item> {/* Thêm menu item mới */}
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;