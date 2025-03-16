import React from 'react';
import PopularTours from "../populartours/PopularTours";
import NewsSection from "../newsection/NewsSection";
import './HomePageLayout.scss';

const HomePageLayout = () => {
  return (
    <div className="home-page-layout">
      <PopularTours />
      <NewsSection />
    </div>
  );
};

export default HomePageLayout;
