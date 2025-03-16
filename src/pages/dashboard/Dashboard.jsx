import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import AdminHeader from "../../components/adminHeader/AdminHeader";
import UserTable from "../../components/usertable/UserTable";
import ActivityFeed from "../../components/activityfeed/ActivityFeed";
import BookingList from "../../components/bookinglist/BookingList";
import SocialMedia from "../../components/socialmedia/SocialMedia";
import StatsCard from "../../components/statsCard/StatsCard";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // Dùng để điều hướng
import { useAuth } from "../../contexts/AuthContext"; // Import AuthContext

import "./Dashboard.scss";

const Dashboard = () => {
  const { user } = useAuth();  // Lấy thông tin người dùng từ context
  const navigate = useNavigate();

  // Nếu người dùng không phải là admin, chuyển hướng về trang đăng nhập
  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;  // Không render bất kỳ nội dung nào khi chưa có quyền admin
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <AdminHeader />
        <Row gutter={[16, 16]}>
          <Col span={6}><StatsCard title="Today Views" value="20,050" color="blue" /></Col>
          <Col span={6}><StatsCard title="All Earnings" value="20,050" color="yellow" /></Col>
          <Col span={6}><StatsCard title="Users" value="20,050" color="red" /></Col>
          <Col span={6}><StatsCard title="Enquiry" value="20,050" color="green" /></Col>
        </Row>
        <UserTable />
        <Row gutter={[16, 16]}>
          <Col span={12}><ActivityFeed /></Col>
          <Col span={12}><BookingList /></Col>
        </Row>
        <SocialMedia />
      </div>
    </div>
  );
};

export default Dashboard;
