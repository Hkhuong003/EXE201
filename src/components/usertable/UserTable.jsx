import React from "react";
import { Table, Avatar } from "antd";

const data = Array(5).fill({
  key: "1",
  name: "John Doe",
  phone: "(555) 123-4567",
  email: "johndoe@example.com",
  enquiry: "02",
  bookings: "02",
  reviews: "02",
});

const columns = [
  {
    title: "User",
    dataIndex: "name",
    render: () => <Avatar src="https://via.placeholder.com/40" />,
  },
  { title: "Name", dataIndex: "name" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Email", dataIndex: "email" },
  { title: "Enquiry", dataIndex: "enquiry" },
  { title: "Bookings", dataIndex: "bookings" },
  { title: "Reviews", dataIndex: "reviews" },
];

const UserTable = () => <Table columns={columns} dataSource={data} pagination={false} />;

export default UserTable;
