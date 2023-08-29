import React, { useState, useEffect } from "react";
import "../App.css";
import MessageFeed from "./MessageFeed";

const Overview = () => {
  const [favorites, setFavorites] = useState([]);
  const [latestImageUrl, setLatestImageUrl] = useState("");

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
        console.log("test:" + transformedUrl)
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

  useEffect(() => {
    fetchFavorite();
    fetchLatestImage();

    const intervalId = setInterval(() => {
      fetchFavorite();
      fetchLatestImage();
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>      
      <table> 
      <h5>Befehle:</h5>
        <tr><td>
          <ul className="order">
            <li>Starte Drohne</li>
            <li>Frage nach Informationen x bei Personengruppe y</li>
            <li>Informiere Personengruppe x über Situation</li>
          </ul>
        </td><td>
            <ul className="order">
              <li>Erstelle Nahaufnahme</li>
              <li>Drohnen Koordinaten</li>
              <li>Personengruppe x wegweisen</li>
            </ul>
        </td><td>
            <ul className="order">
              <li>Starte Suche auf Wasser</li>
              <li>Identifiziere Person</li>
              <li>Breche Suche ab</li>
            </ul>
        </td></tr>
      </table>
    <div className="overview" style = {containerStyles}>
      <div className="column message">
      <button onClick={clearFavorites}>Delete All Favorites(!)</button>

        <MessageFeed></MessageFeed>
      </div>
      <div className="column livepicture">
          <h2>Aktuelles Bild</h2>
            {latestImageUrl && (
            <img src={latestImageUrl}/>
            )}
      <div className="column favorite">
          <h2>Favoriten</h2>
        {favorites.map((favorite) => (
          <img
            key={favorite.id}
            src={favorite.url}
            alt={`Favorite ${favorite.id}`}
            className="favorite-image"
          />
        ))}
      </div>
      </div>
      </div>
    </div>
  );
};

export default Overview;




