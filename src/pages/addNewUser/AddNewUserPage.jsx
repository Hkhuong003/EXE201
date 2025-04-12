import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import "./AddNewUserPage.scss";

const AddNewUserPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
    message.success("User added successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please check the form and try again.");
  };

  const validatePhone = (_, value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!value) {
      return Promise.resolve();
    }
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error("Please enter a valid 10-digit phone number!"));
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value) {
      return Promise.reject(new Error("Please enter your password!"));
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject(
        new Error("Password must be at least 8 characters, include uppercase, lowercase, number, and special character!")
      );
    }
    return Promise.resolve();
  };

  return (
    <div className="add-new-user-page">
      <AdminHeader
        onSidebarMouseEnter={() => setSidebarVisible(true)}
        onSidebarMouseLeave={() => setSidebarVisible(false)}
        sidebarVisible={sidebarVisible}
      />
      <div className={`main-content ${sidebarVisible ? "sidebar-open" : ""}`}>
        <h1>Add New User</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="form-row">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter the first name!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter the last name!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>
          <div className="form-row">
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                { required: true, message: "Please enter the mobile number!" },
                { validator: validatePhone },
              ]}
            >
              <Input placeholder="Mobile" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ validator: validatePhone }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </div>
          <Form.Item
            label="Address"
            name="address"
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <div className="form-row">
            <Form.Item
              label="Password"
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" />
            </Form.Item>
          </div>
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

export default AddNewUserPage;