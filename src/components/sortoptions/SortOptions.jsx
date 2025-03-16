import React, { useState } from "react";
import "./SortOptions.scss";

const SortOptions = () => {
  const [activeSort, setActiveSort] = useState("date");

  return (
    <div className="sort-container">
      <span className="sort-label">Sắp xếp:</span>
      <button
        className={`sort-button ${activeSort === "date" ? "active" : ""}`}
        onClick={() => setActiveSort("date")}
      >
        Ngày gần nhất
      </button>
      <span className="separator">|</span>
      <button
        className={`sort-button ${activeSort === "popular" ? "active" : ""}`}
        onClick={() => setActiveSort("popular")}
      >
        Hấp dẫn nhất
      </button>
    </div>
  );
};

export default SortOptions;
