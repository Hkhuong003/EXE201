import React from 'react';
import image from '../../assets/background.png';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <img src={image} alt="ĐÀ LẠT" className="hero-image" />
    </section>
  );
};

export default HeroSection;
