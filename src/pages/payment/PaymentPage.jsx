import React from "react";
import { Card } from "antd";
import qrCodeImage from "../../assets/qr-code.png"; // Đường dẫn tới ảnh QR
import "../payment/PaymentPage.scss";

const PaymentPay = () => {
  return (
    <div className="payment-container">
      <Card className="payment-card">
        <h2>Quét mã QR để thanh toán</h2>
        <img src={qrCodeImage} alt="QR Code" className="qr-code" />
      </Card>
    </div>
  );
};

export default PaymentPay;
