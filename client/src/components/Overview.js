import React, { useState, useEffect } from "react";
import "../App.css";
import MessageFeed from "./MessageFeed";
import GoogleMaps from "./GoogleMaps";
import { droneGetCoordinates } from "./functions";


const Overview = () => {
  const [favorites, setFavorites] = useState([]);
  const [latestImageUrl, setLatestImageUrl] = useState("");
  const [open, setOPen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [coordinates, setCoordinates] = React.useState(null);

  const containerStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  };

  const fetchLatestImage = async () => {
    const publicFolderPath = "http://172.23.4.80/share/predict_output/";
    try {
      const response = await fetch('http://172.23.4.80/data');
      const data = await response.json();
      const latestEntry = data[data.length - 1]; // Get the last entry
      console.log(latestEntry)
      if (latestEntry && latestEntry._id) {
        const transformedUrl = `${publicFolderPath}${latestEntry._id}`;
        setLatestImageUrl(transformedUrl);
      }
    } catch (error) {
      console.error('Error fetching latest image:', error);
    }
  };

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

  const clearFavorites = async () => {
    try {
      const response = await fetch('http://172.23.4.80/api/favorite/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFavorites([]); // Clear the messages locally
      } else {
        console.error('Failed to clear favorites');
      }
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  };

  // Get the button:
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () { scrollFunction() };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const toggle = () => {
    setIsButtonVisible(!isButtonVisible);
    setOPen(!open);
  };

  const fetchDroneCoordinates = async () => {
    try {
      const data = await droneGetCoordinates();
      setCoordinates(data); // Set the coordinates in the state
    } catch (error) {
      console.error("Error fetching drone coordinates:", error);
    }
  };
  if (coordinates) {
    var long = coordinates.long
    var lat = coordinates.lat;
  }

  useEffect(() => {
    fetchFavorite();
    fetchLatestImage();
    fetchDroneCoordinates();

    const imageInterval = setInterval(() => {
      fetchFavorite();
      fetchLatestImage();
    }, 3000);

    const coordinatesInterval = setInterval(fetchDroneCoordinates, 10000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(coordinatesInterval)
    }
  }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(fetchDroneCoordinates, 10000); // 10 seconds
  //   fetchDroneCoordinates(); // Initial fetch
  //   return () => clearInterval(intervalId); // Cleanup the interval on unmount
  // }, []);

  return (
    <div>
      <div className="overview" style={containerStyles}>
        <div className="column message">
          <button onClick={clearFavorites}>Delete All Favorites(!)</button>
          <MessageFeed></MessageFeed>
        </div>
        <div className="column livepicture">
          <h2>Aktuelles Bild</h2>
          {latestImageUrl && (
            <img src={latestImageUrl} alt="newest img" />
          )}

          <h2>Map</h2>
          <div className="googleMap">
            <GoogleMaps latitude={lat} longitude={long} />
            <h6>Koordinaten<br /><br />
              Latitude: {lat}<br /><br />
              Longitude: {long}</h6>
          </div>

          <div className="column favorite">
            <h2>Favoriten</h2>
            {isButtonVisible ? (
              <button onClick={toggle}>Anzeigen</button>
            ) : (
              <button onClick={toggle}>Ausblenden</button>
            )}
            {open && (
              <div>
                {favorites.reverse().map((favorite) => (
                  <img
                    key={favorite.id}
                    src={favorite.url}
                    alt={`Favorite ${favorite.id}`}
                    className="favorite-image"
                  />
                ))}</div>)}
          </div>
        </div>
      </div>
      <button onClick={topFunction} id="myBtn" title="Go to top">^</button>
    </div>
  );
};

export default Overview;




