import React, { useState } from "react";
import { Form, Input, Button, message, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AddToursPackagePage.scss";

const { Option } = Select;
const { TextArea } = Input;

const AddToursPackagePage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
    message.success("Tour package added successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please check the form and try again.");
  };

  // Custom validation for file upload
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <div className="add-tours-package-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>Add package</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tour Name"
            name="tourName"
            rules={[{ required: true, message: "Please enter the tour name!" }]}
          >
            <Input placeholder="Tour Name" />
          </Form.Item>
          <Form.Item
            label="Upload Blog Banner"
            name="blogBanner"
            rules={[{ required: true, message: "Please upload a blog banner!" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              beforeUpload={beforeUpload}
              maxCount={1}
              listType="picture"
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>FILE</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Package Descriptions"
            name="description"
          >
            <TextArea placeholder="Package Descriptions" rows={4} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
          >
            <Input placeholder="Category" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
          >
            <Input placeholder="Time" />
          </Form.Item>
          <Form.Item
            label="Author Name"
            name="authorName"
          >
            <Input placeholder="Author Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddToursPackagePage;