import { useState } from "react";
import React from 'react';

const ImageSliderFavorite = ({ slides, favorite }) => {

    const [currentIndex, setCurrentIndex] = useState(slides.length - 1);


    const sliderStyles = {
        height: "100%",
        position: "relative",
      };


    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides.length > 0 ? slides[currentIndex].url: ''})`,
      };
    
      const infoContainerStyles = {
        // Additional styles for the information container
        textAlign: "center",
        padding: "10px", // Optional padding for the information container
        borderRadius: "5px", // Optional border radius for the information container
      };


  return (
    <div style={sliderStyles}>
      {/* ... (your slider content) */}
      <div style={infoContainerStyles}>
        <h2>Favorite Images</h2>
        <ul>
          {slides.length > 0 && slides.filter(slide => favorite.includes(slide.url)).map((slide, index) => (
            <li key={index}>
              <p>Image URL: {slide.url}</p>
              {/* Display other slide information here if needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageSliderFavorite;