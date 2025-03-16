import React from "react";
import { Layout, Row, Col, Divider } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./Footer.scss";
import logo from "../../assets/logo.png";

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer className="footer">
      <Row className="footer-container" justify="space-between">
        {/* Thông tin văn phòng */}
        <Col xs={24} sm={12} md={8} className="footer-info">
          <p><strong>Văn phòng TPHCM</strong><br />114a Nam Kì Khởi Nghĩa, Q9, TPHCM</p>
          <p><strong>Văn phòng Đà Lạt</strong><br />114a Nam Kì Khởi Nghĩa, Q9, TPHCM</p>

          {/* Mạng xã hội */}
          <div className="footer-social">
            <FacebookOutlined className="social-icon" />
            <InstagramOutlined className="social-icon" />
            <YoutubeOutlined className="social-icon" />
          </div>

          <p className="terms">Điều khoản và điều kiện</p>
        </Col>

        {/* Liên hệ */}
        <Col xs={24} sm={12} md={6} className="footer-contact">
          <p><strong>LIÊN HỆ</strong></p>
          <p>093478472847</p>
          <p>sdjghsdgfthksdjh@gmail.com</p>
        </Col>

        {/* Logo & thương hiệu */}
        <Col xs={24} sm={24} md={8} className="footer-logo">
          <img src={logo} alt="Dalat and Chill" />
          <p className="brand-name">DALAT and chill</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
