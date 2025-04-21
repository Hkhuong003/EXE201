import React, { useEffect, useState } from "react";
import { Pagination, Modal } from "antd";
import axios from "axios";
import "./NewsSection.scss";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị popup
  const [selectedNews, setSelectedNews] = useState(null); // Tin tức được chọn
  const [modalError, setModalError] = useState(null); // Lỗi khi lấy chi tiết tin tức

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/News");
        setNews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tin tức:", error);
        setError("Không thể tải danh sách tin tức.");
      }
    };
    fetchNews();
  }, []);

  // Xử lý khi nhấp "Xem thêm"
  const handleViewDetails = async (newsId) => {
    try {
      const response = await axios.get(`https://exe201tourbook.azurewebsites.net/api/News/${newsId}`);
      setSelectedNews(response.data);
      setModalError(null);
      setIsModalVisible(true); // Mở popup
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết tin tức:", error);
      setModalError("Không thể tải chi tiết tin tức.");
      setIsModalVisible(true);
    }
  };

  // Đóng popup
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedNews(null);
    setModalError(null);
  };

  // Xử lý khi thay đổi trang hoặc số mục mỗi trang
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Tính toán danh sách tin tức hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedNews = news.slice(startIndex, endIndex);

  if (error) {
    return <div className="news-section">{error}</div>;
  }

  return (
    <div className="news-section">
      <h3 className="news-header">Tin tức</h3>
      <div className="news-list">
        {displayedNews.map((item) => (
          <div key={item.newsId} className="news-card">
            <img
              src={item.pictureUrl || "https://via.placeholder.com/150"}
              alt={item.title}
              className="news-image"
            />
            <div className="news-content">
              <h4 className="news-title">{item.title}</h4>
              <p className="news-content-text">{item.summary}</p>
              <button
                className="news-button"
                onClick={() => handleViewDetails(item.newsId)} // Gọi hàm xem chi tiết
              >
                Xem thêm
              </button>
            </div>
          </div>
        ))}
      </div>
      {news.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={news.length}
            onChange={handlePaginationChange}
            showSizeChanger
            pageSizeOptions={["4", "8", "12"]}
          />
        </div>
      )}

      {/* Popup hiển thị chi tiết tin tức */}
      <Modal
        title={selectedNews ? selectedNews.title : "Chi tiết tin tức"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800} // Tăng chiều rộng popup để chứa hình ảnh lớn
      >
        {modalError ? (
          <p className="modal-error">{modalError}</p>
        ) : selectedNews ? (
          <div className="news-detail">
            <img
              src={selectedNews.pictureUrl || "https://via.placeholder.com/150"}
              alt={selectedNews.title}
              className="news-detail-image"
            />
            <p className="news-detail-content">{selectedNews.content}</p>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </Modal>
    </div>
  );
};

export default NewsSection;