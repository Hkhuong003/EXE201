import React from 'react';
import './NewsSection.scss';
import newsImage from '../../assets/logo.png'; // Thay bằng ảnh phù hợp

const news = [
  { title: 'Top 10 địa điểm ăn uống ngon nhất Đà Lạt' },
  { title: 'Top 10 địa điểm ăn uống ngon nhất Đà Lạt' },
  { title: 'Top 10 địa điểm ăn uống ngon nhất Đà Lạt' },
  { title: 'Top 10 địa điểm ăn uống ngon nhất Đà Lạt' },
];

const NewsSection = () => {
  return (
    <div className="news-section">
      <h3 className="news-header">Tin tức</h3>
      <div className="news-list">
        {news.map((item, index) => (
          <div key={index} className="news-card">
            <img src={newsImage} alt={item.title} className="news-image" />
            <div className="news-content">
              <p className="news-title">{item.title}</p>
              <button className="news-button">Xem thêm</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
