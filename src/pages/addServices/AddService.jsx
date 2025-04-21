import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, InputNumber } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./AddService.scss";

const AddService = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onFinish = async (values) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("https://exe201tourbook.azurewebsites.net/api/Service", {
        name: values.name,
        description: values.description,
        price: values.price,
      });
      if (response.data.message === "Service created successfully.") {
        setSuccess("Thêm dịch vụ thành công!");
        setTimeout(() => navigate("/services"), 2000); // Chuyển hướng sau 2s
      } else {
        throw new Error("Thêm dịch vụ thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      setError(`Không thể thêm dịch vụ: ${errorMessage}`);
    }
  };

  return (
    <div className="add-service-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <Sidebar
        visible={sidebarVisible}
        onMouseEnter={() => setSidebarVisible(true)}
        onMouseLeave={() => setSidebarVisible(false)}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>Tạo Dịch Vụ Mới</h1>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ name: "", description: "", price: 0 }}
        >
          <Form.Item
            label="Tên Dịch Vụ"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
          >
            <Input placeholder="Nhập tên dịch vụ" />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả dịch vụ" />
          </Form.Item>
          <Form.Item
            label="Giá (VND)"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }, { type: "number", min: 0, message: "Giá phải lớn hơn hoặc bằng 0" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Nhập giá dịch vụ"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate("/services")}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddService;