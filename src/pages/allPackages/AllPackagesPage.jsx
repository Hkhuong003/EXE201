import React, { useState, useEffect } from "react";
import { Table, Space, Button, Popconfirm, message, Modal, Form, Input } from "antd";
import { EditOutlined, StopOutlined } from "@ant-design/icons";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./AllPackagesPage.scss";

const { TextArea } = Input;

const AllPackagesPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [packagesData, setPackagesData] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/packages");
        const packages = response.data
          .filter((pkg) => pkg.isActive) // Chỉ hiển thị gói tour có isActive: true
          .map((pkg) => ({
            key: pkg.id.toString(),
            id: pkg.id,
            accountId: pkg.accountId,
            destinationId: pkg.destinationId,
            name: pkg.name,
            description: pkg.description,
            price: pkg.price,
            rating: pkg.rating,
            pictureUrl: pkg.pictureUrl,
            isActive: pkg.isActive,
          }));
        setPackagesData(packages);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói tour:", error);
        setError("Không thể tải danh sách gói tour");
      }
    };
    fetchPackages();
  }, []);

  const handleEdit = (record) => {
    setSelectedPackage(record);
    form.setFieldsValue({
      tourName: record.name,
      description: record.description,
      pictureUrl: record.pictureUrl,
    });
    setModalVisible(true);
  };

  const handleDeactivate = async (record) => {
    try {
      const payload = {
        accountId: record.accountId,
        destinationId: record.destinationId,
        name: record.name,
        description: record.description,
        rating: record.rating,
        price: record.price,
        pictureUrl: record.pictureUrl,
        isActive: false, // Đặt isActive thành false để vô hiệu hóa
      };

      const response = await axios.put(`https://exe201tourbook.azurewebsites.net/api/packages/deactivate/${record.id}`, payload);
      if (response.status === 200 || response.data.message === "Package deactivated successfully.") {
        setPackagesData((prevData) => prevData.filter((pkg) => pkg.id !== record.id)); // Loại bỏ gói tour khỏi danh sách
        message.success("Đã vô hiệu hóa gói tour thành công!");
      } else {
        throw new Error("Vô hiệu hóa gói tour thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi vô hiệu hóa gói tour:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      message.error(`Không thể vô hiệu hóa gói tour: ${errorMessage}`);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        accountId: selectedPackage.accountId,
        destinationId: selectedPackage.destinationId,
        name: values.tourName,
        description: values.description,
        rating: selectedPackage.rating,
        price: selectedPackage.price,
        pictureUrl: values.pictureUrl,
        isActive: selectedPackage.isActive,
      };

      const response = await axios.put(`https://exe201tourbook.azurewebsites.net/api/packages/${selectedPackage.id}`, payload);
      if (response.data.message === "Package updated successfully.") {
        setPackagesData((prevData) =>
          prevData.map((pkg) =>
            pkg.id === selectedPackage.id
              ? { ...pkg, name: values.tourName, description: values.description, pictureUrl: values.pictureUrl }
              : pkg
          )
        );
        message.success("Cập nhật gói tour thành công!");
        setModalVisible(false);
        form.resetFields();
        setSelectedPackage(null);
      } else {
        throw new Error("Cập nhật gói tour thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật gói tour:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      message.error(`Không thể cập nhật gói tour: ${errorMessage}`);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setSelectedPackage(null);
  };

  const packageColumns = [
    {
      title: "Tên Gói Tour",
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
      title: "Đánh Giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <span>{rating}/5</span>,
    },
    {
      title: "Ảnh",
      dataIndex: "pictureUrl",
      key: "pictureUrl",
      render: (url) => (
        <img
          src={url || "https://via.placeholder.com/50"}
          alt="package"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Sửa",
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
      title: "Vô Hiệu Hóa",
      key: "deactivate",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc muốn vô hiệu hóa gói tour này?"
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
    <div className="all-packages-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>Danh Sách Gói Tour</h1>
        {error && <div className="error-message">{error}</div>}
        <Table
          columns={packageColumns}
          dataSource={packagesData}
          pagination={false}
          className="package-table"
        />
        <Modal
          title="Chỉnh Sửa Gói Tour"
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Cập Nhật"
          cancelText="Hủy"
        >
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label="Tên Gói Tour"
              name="tourName"
              rules={[{ required: true, message: "Vui lòng nhập tên gói tour!" }]}
            >
              <Input placeholder="Tên Gói Tour" />
            </Form.Item>
            <Form.Item
              label="URL Ảnh Đại Diện"
              name="pictureUrl"
              rules={[{ required: true, message: "Vui lòng nhập URL ảnh!" }]}
            >
              <Input placeholder="Nhập URL ảnh" />
            </Form.Item>
            <Form.Item
              label="Mô Tả Gói Tour"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <TextArea placeholder="Mô Tả Gói Tour" rows={4} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AllPackagesPage;