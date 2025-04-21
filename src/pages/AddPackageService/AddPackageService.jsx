import React, { useState, useEffect } from "react";
import { Form, Select, Button, InputNumber } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import "./AddPackageService.scss";

const { Option } = Select;

const AddPackageService = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách Service
        const servicesResponse = await axios.get("https://exe201tourbook.azurewebsites.net/api/Service");
        setServices(servicesResponse.data.filter((service) => service.isActive));

        // Lấy danh sách Package
        const packagesResponse = await axios.get("https://exe201tourbook.azurewebsites.net/api/packages");
        setPackages(packagesResponse.data.filter((pkg) => pkg.isActive));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setError("Không thể tải dữ liệu dịch vụ hoặc gói tour");
      }
    };
    fetchData();
  }, []);

  const onServiceChange = (serviceId) => {
    const selectedService = services.find((service) => service.id === serviceId);
    if (selectedService) {
      form.setFieldsValue({ price: selectedService.price }); // Cập nhật giá từ Service
    }
  };

  const onFinish = async (values) => {
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("https://exe201tourbook.azurewebsites.net/api/packageservices", {
        packageId: values.packageId,
        serviceId: values.serviceId,
        price: values.price,
      });
      if (response.data.message === "PackageService created successfully.") {
        setSuccess("Thêm PackageService thành công!");
        form.resetFields(); // Reset form sau khi thành công
      } else {
        throw new Error("Thêm PackageService thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thêm PackageService:", error);
      const errorMessage = error.response?.data?.message || error.message;
      console.log("Chi tiết lỗi API:", JSON.stringify(error.response?.data, null, 2));
      setError(`Không thể thêm PackageService: ${errorMessage}`);
    }
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form khi nhấn Hủy
  };

  return (
    <div className="add-package-service-page">
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
        <h1>Tạo PackageService Mới</h1>
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Gói Tour"
            name="packageId"
            rules={[{ required: true, message: "Vui lòng chọn gói tour" }]}
          >
            <Select placeholder="Chọn gói tour">
              {packages.map((pkg) => (
                <Option key={pkg.id} value={pkg.id}>
                  {pkg.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Dịch Vụ"
            name="serviceId"
            rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
          >
            <Select placeholder="Chọn dịch vụ" onChange={onServiceChange}>
              {services.map((service) => (
                <Option key={service.id} value={service.id}>
                  {service.name} ({service.price.toLocaleString("vi-VN")}đ)
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Giá (VND)"
            name="price"
            rules={[{ required: true, message: "Giá không được để trống" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              disabled
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={handleCancel} // Chỉ reset form, không navigate
            >
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPackageService;