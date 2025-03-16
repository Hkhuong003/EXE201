import React from "react";
import "./Filters.scss";

const Filters = () => {
  return (
    <div className="filters">
      <h4>Bộ lọc</h4>
      <div className="filter-group">
        <span>Phương tiện:</span>
        <button>Xe máy</button>
        <button>Xe khách</button>
      </div>
      <div className="filter-group">
        <span>Nhu cầu:</span>
        <button>Du lịch sinh thái</button>
        <button>Teambuilding</button>
        <button>Du lịch nghỉ dưỡng</button>
      </div>
    </div>
  );
};

export default Filters;
