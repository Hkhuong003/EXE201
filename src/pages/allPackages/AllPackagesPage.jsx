import React, { useState } from "react";
import { Table, Space, Button, Popconfirm, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AllPackagesPage.scss";

const AllPackagesPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const packageColumns = [
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
    { title: "Package", dataIndex: "package", key: "package" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        />
      ),
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this package?"
          onConfirm={() => handleDelete(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ];

  const packageData = [
    {
      key: "1",
      user: "John Doe",
      package: "2n3",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
    },
    {
      key: "2",
      user: "John Doe",
      package: "2n3",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
    },
    {
      key: "3",
      user: "John Doe",
      package: "2n3",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
    },
    {
      key: "4",
      user: "John Doe",
      package: "2n3",
      phone: "(555) 123-4567",
      email: "johndoe@example.com",
    },
  ];

  const handleView = (record) => {
    console.log("View package:", record);
    // Logic để xem chi tiết package (ví dụ: điều hướng đến trang chi tiết)
  };

  const handleEdit = (record) => {
    console.log("Edit package:", record);
    // Logic để chỉnh sửa package (ví dụ: điều hướng đến trang chỉnh sửa)
  };

  const handleDelete = (record) => {
    console.log("Delete package:", record);
    message.success("Package deleted successfully!");
    // Logic để xóa package (ví dụ: gọi API xóa)
  };

  return (
    <div className="all-packages-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>All Packages</h1>
        <Table
          columns={packageColumns}
          dataSource={packageData}
          pagination={false}
          className="package-table"
        />
      </div>
    </div>
  );
};

export default AllPackagesPage;