import React, { useState } from "react";

const TourInfoTabs = ({ details }) => {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="tour-tabs">
      <div className="tabs">
        <button onClick={() => setActiveTab("schedule")}>Lịch trình</button>
        <button onClick={() => setActiveTab("policy")}>Điều lệ</button>
        <button onClick={() => setActiveTab("price")}>Bảng giá</button>
      </div>
      <div className="tab-content">
        {activeTab === "schedule" && <p>{details.schedule}</p>}
        {activeTab === "policy" && <p>{details.policy}</p>}
        {activeTab === "price" && <p>{details.price}</p>}
      </div>
    </div>
  );
};

export default TourInfoTabs;
