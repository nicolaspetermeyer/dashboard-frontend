import React from "react";
import "../App.css";
import ImageSlider from "./ImageSlider";
import ImageData from "./ImageData";

const Home = () => {
  const slides = [
    { url: "http://localhost:3000/images/image1.png", title: "Image 1" },
    { url: "http://localhost:3000/images/image2.png", title: "Image 2" },
    { url: "http://localhost:3000/images/image3.png", title: "Image 3" },
    { url: "http://localhost:3000/images/image4.png", title: "Image 4" },
    { url: "http://localhost:3000/images/image5.png", title: "Image 5" },
  ];

  const containerStyles = {
    width: "825px",
    height: "462px",
  };

  return (
    <div className="float-container">
      <div class="float-child-message">
        <ImageData />
      </div>
      <div class="float-child-image" style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Home;
