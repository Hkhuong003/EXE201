import React, { useState, useEffect } from "react";
import { Table, Space, Button, Popconfirm, message } from "antd";
import { StopOutlined } from "@ant-design/icons";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./ServicesPage.scss";

const ServicesPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/Service");
        const services = response.data
          .filter((service) => service.isActive)
          .map((service) => ({
            key: service.id.toString(),
            id: service.id,
            name: service.name,
            description: service.description,
            price: service.price,
            isActive: service.isActive,
          }));
        setServicesData(services);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", error);
        setError("Không thể tải danh sách dịch vụ");
      }
    };
    fetchServices();
  }, []);

  const handleDeactivate = async (record) => {
    try {
      const payload = {
        name: record.name,
        description: record.description,
        price: record.price,
        isActive: false, // Đặt isActive thành false để vô hiệu hóa
      };

      const response = await axios.put(`https://exe201tourbook.azurewebsites.net/api/Service/deactivate/${record.id}`, payload);
      if (response.status === 200 || response.data.message === "Service deactivated successfully.") {
        setServicesData((prevData) => prevData.filter((service) => service.id !== record.id)); // Loại bỏ dịch vụ khỏi danh sách
        message.success("Đã vô hiệu hóa dịch vụ thành công!");
      } else {
        throw new Error("Vô hiệu hóa dịch vụ thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi vô hiệu hóa dịch vụ:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      message.error(`Không thể vô hiệu hóa dịch vụ: ${errorMessage}`);
    }
  };

  const serviceColumns = [
    {
      title: "Tên Dịch Vụ",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>{price.toLocaleString("vi-VN")}đ</span>,
    },
    {
      title: "Vô Hiệu Hóa",
      key: "deactivate",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn vô hiệu hóa dịch vụ này?"
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
    <div className="services-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>Danh Sách Dịch Vụ</h1>
        {error && <div className="error-message">{error}</div>}
        <Table
          columns={serviceColumns}
          dataSource={servicesData}
          pagination={false}
          className="service-table"
        />
      </div>
    </div>
  );
};

export default ServicesPage;