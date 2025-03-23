import React from "react";
import { Menu } from "antd";
import { DashboardOutlined, UserOutlined, FolderOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ visible, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "dashboard") navigate("/adminDashboard");
    if (e.key === "all-users") navigate("/users");
    if (e.key === "add-user") navigate("/users/add"); // Thêm route cho Add New User
    if (e.key === "all-tours") navigate("/tours");
    if (e.key === "add-tours") navigate("/tours/add");
  };

  return (
    <div className={`sidebar ${visible ? "show" : ""}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["users", "tours"]}
        style={{ height: "100%", borderRight: 0 }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          DASHBOARD
        </Menu.Item>
        <Menu.SubMenu key="users" icon={<UserOutlined />} title="Users">
          <Menu.Item key="all-users">All User</Menu.Item>
          <Menu.Item key="add-user">Add New User</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="tours" icon={<FolderOutlined />} title="Tours Packages">
          <Menu.Item key="all-tours">All Tours Packages</Menu.Item>
          <Menu.Item key="add-tours">Add Tours Packages</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Sidebar;