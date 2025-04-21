import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Select } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./AddToursPackagePage.scss";

const { TextArea } = Input;
const { Option } = Select;

// Mô phỏng lấy user ID (thay bằng logic xác thực thực tế)
const getUserId = () => {
  return parseInt(localStorage.getItem("userId")) || 4; // Mặc định là 4 (admin) để kiểm tra
};

const AddToursPackagePage = () => {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/destinations");
        setDestinations(response.data.filter((dest) => dest.isActive));
      } catch (error) {
        console.error("Lỗi khi lấy danh sách điểm đến:", error);
        setError("Không thể lấy danh sách điểm đến");
      }
    };
    fetchDestinations();
  }, []);

  const onFinish = async (values) => {
    setError(null);
    setSuccess(null);

    try {
      const accountId = getUserId();

      const payload = {
        accountId: accountId,
        destinationId: values.destinationId,
        name: values.tourName,
        description: values.description,
        rating: 0, // Mặc định
        pictureUrl: values.pictureUrl,
        isActive: true, // Mặc định true
      };

      const response = await axios.post("https://exe201tourbook.azurewebsites.net/api/packages", payload);
      if (response.data.message === "Package created successfully. Please add PackageServices to update price.") {
        setSuccess("Thêm gói tour thành công!");
        form.resetFields(); // Reset form
      } else {
        throw new Error("Thêm gói tour thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thêm gói tour:", error);
      console.log("Toàn bộ phản hồi lỗi:", JSON.stringify(error.response, null, 2));
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      setError(`Không thể thêm gói tour: ${errorMessage}`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Vui lòng kiểm tra form và thử lại.");
  };

  return (
    <div className="add-tours-package-page">
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
        <h1>Thêm Gói Tour Mới</h1>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            label="Điểm Đến"
            name="destinationId"
            rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
          >
            <Select placeholder="Chọn điểm đến">
              {destinations.map((destination) => (
                <Option key={destination.id} value={destination.id}>
                  {destination.name} ({destination.location})
                </Option>
              ))}
            </Select>
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm Gói
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate("/tours")}
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddToursPackagePage;