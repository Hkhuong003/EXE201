import React from "react";
import { Menu } from "antd";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import "./Sidebar.scss";

const Sidebar = ({ visible, onMouseEnter, onMouseLeave }) => {
  return (
    <div className={`sidebar ${visible ? "show" : ""}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Menu mode="vertical">
        <Menu.Item key="1" icon={<UserOutlined />}>
          Users
        </Menu.Item>
        <Menu.SubMenu key="2" icon={<AppstoreOutlined />} title="Tours Packages">
          <Menu.Item key="2-1">All Tours Packages</Menu.Item>
          <Menu.Item key="2-2">Add Tours Packages</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="3">Profiles</Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
