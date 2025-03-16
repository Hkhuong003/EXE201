import React from "react";

const TourSidebar = ({ info }) => {
  return (
    <div className="tour-sidebar">
      <h3>Thông tin tour</h3>
      <p><strong>Hotline:</strong> {info.hotline}</p>
      <p><strong>Email:</strong> {info.email}</p>
    </div>
  );
};

export default TourSidebar;
