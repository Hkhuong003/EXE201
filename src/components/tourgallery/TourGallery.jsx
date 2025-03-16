import React from "react";
import "./TourGallery.scss";

const TourGallery = ({ images }) => {
  return (
    <div className="tour-gallery">
      {images.map((image, index) => (
        <div key={index} className="tour-gallery__item">
          <img src={image.src} alt={image.title} className="tour-gallery__image" />
          <div className="tour-gallery__title">{image.title}</div>
        </div>
      ))}
    </div>
  );
};

// Dữ liệu mẫu
const galleryData = [
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjGepgCbRuzfkLN48vxzkNE2G1eMnf7tmgQ&s", title: "Tour săn mây Đà Lạt" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjGepgCbRuzfkLN48vxzkNE2G1eMnf7tmgQ&s", title: "Tour núi Langbiang" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjGepgCbRuzfkLN48vxzkNE2G1eMnf7tmgQ&s", title: "Tour thác Dalanta" },
];

export default function TourGalleryContainer() {
  return <TourGallery images={galleryData} />;
}
