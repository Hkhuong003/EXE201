import React, { useState, useEffect } from "react";
import Filters from "../../components/filters/Filters";
import SortOptions from "../../components/sortoptions/SortOptions";
import TourCard from "../../components/tourcards/TourCard";
import SearchBar from "../../components/searchbar/SearchBar";
import InfoSection from "../../components/infosection/InfoSection";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import "./SearchPage.scss";

const SearchPage = () => {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://exe201tourbook.azurewebsites.net/api/packages");
        const formattedTours = response.data
          .filter((tour) => tour.isActive) // Lọc tour có isActive: true
          .map((tour) => ({
            id: tour.id,
            title: tour.name,
            description: tour.description,
            price: tour.price,
            rating: tour.rating,
            image: tour.pictureUrl || "https://via.placeholder.com/300x200", // Fallback nếu không có pictureUrl
          }));
        setTours(formattedTours);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setError("Không thể tải danh sách gói tour. Vui lòng thử lại.");
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="search-page">
      <SearchBar />
      <Filters />
      <SortOptions />
      {error && <div className="error-message">{error}</div>}
      <div className="tour-list">
        {tours.length > 0 ? (
          tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          !error && <div>Không có gói tour nào.</div>
        )}
      </div>
      <InfoSection />
      <Footer />
    </div>
  );
};

export default SearchPage;