import React from "react";
import { InfoCircleOutlined, PhoneOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./InfoSection.scss";

const InfoSection = () => {
  return (
    <section className="info-section">
      <div className="info-box">
        <InfoCircleOutlined className="icon" />
        <p className="title">Giới thiệu về Dalat Tourism</p>
        <p>Thương hiệu du lịch giá rẻ - tối ưu</p>
        <p>Du lịch mộng mơ, không lo về giá</p>
      </div>

      <div className="info-box">
        <PhoneOutlined className="icon" />
        <p className="title">Hỗ trợ trực tuyến 24/7</p>
        <p>📞 111111111111</p>
        <p>📧 dalattourism@gmail.com</p>
      </div>

      <div className="info-box">
        <CheckCircleOutlined className="icon" />
        <p className="title">Tại sao chọn Dalat Tourism?</p>
        <p>✅ Giá cả hợp lý</p>
        <p>✅ Chất lượng dịch vụ vượt trội</p>
      </div>
    </section>
  );
};

export default InfoSection;
