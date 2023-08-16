import React, { useState, useEffect } from "react";
import "../App.css";
import ImageSlider from "./ImageSlider";

const Overview = () => {
  const [favorites, setFavorites] = useState([]);


  const fetchFavorite = async () => {
    try {
      const response = await fetch('http://172.23.4.80/api/favorite');
      const data = await response.json();
      console.log(data)

      //const formattedFavorites = data.map(url => ({ url }));

      setFavorites(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <div className="overview">
      {/* <ImageSlider slides={favorites}/> */}
      <button onClick={fetchFavorite}>Test</button>
    </div>
  );
};

export default Overview;
