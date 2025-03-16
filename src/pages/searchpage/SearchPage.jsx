import React, { useState } from "react";
import Filters from "../../components/filters/Filters";
import SortOptions from "../../components/sortoptions/SortOptions";
import TourCard from "../../components/tourcards/TourCard";
import SearchBar from "../../components/searchbar/SearchBar";
import InfoSection from "../../components/infosection/InfoSection";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./SearchPage.scss";

const SearchPage = () => {
  const [tours, setTours] = useState([
    { id: 1, title: "Tour Đà Lạt 3 ngày 2 đêm", date: "3 ngày 2 đêm", transport: "Xe du lịch", image: "https://source.unsplash.com/300x200/?dalat" },
    { id: 2, title: "Tour Đà Lạt 2 ngày 1 đêm", date: "2 ngày 1 đêm", transport: "Xe du lịch", image: "https://source.unsplash.com/300x200/?mountain" },
  ]);

  return (
    <div className="search-page">
      <Header />
      <SearchBar />
      <Filters />
      <SortOptions />
      <div className="tour-list">
        {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
      </div>
      <InfoSection />
      <Footer />
    </div>
  );
};

export default SearchPage;
