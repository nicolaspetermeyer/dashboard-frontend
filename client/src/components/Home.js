import React, { useState, useEffect } from "react";
import "../App.css";
import ImageSlider from "./ImageSlider";
import MessageFeed from "./MessageFeed";
import { getId, websocketRequest, droneGetCoordinates } from "./functions";

const Home = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    loadSlides();

    const intervalId = setInterval(loadSlides, 4000);
    
    return () => clearInterval(intervalId);
  }, []);

  const loadSlides = () => {
    getId()
      .then((data) => {
        setSlides(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      console.log("test")
  };

  const containerStyles = {
    width: "700px",
    height: "420px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
 

  return (
    <div className="float-container">
      
      {/* <button
            onClick={() => {
              droneGetCoordinates()
                .then((coordinates) => {
                  if (Object.keys(coordinates).length === 0) {
                    console.error("Did not receive a success message.");
                  } else {
                    console.log("Received the new coordinates:", coordinates);
                    // Here, you can perform further actions with the received coordinates.
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
            title="Picture"
            color="blue"
          >
            Get Coordinates
          </button>
          <button
            onClick={() => {
              websocketRequest()
                .then((coordinates) => {
                  if (Object.keys(coordinates).length === 0) {
                    console.error("Did not receive a success message.");
                  } else {
                    console.log("Received the new coordinates:", coordinates);
                    // Here, you can perform further actions with the received coordinates.
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
            title="Picture"
            color="blue"
          >
            Connect WebSocket
          </button> */}
          
      {slides.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* <div className ="Buttons">
          <button onClick={handleReload}>Reload ImageSlider</button>
            </div> */}
        <div className="float-child-message">
        
          <MessageFeed></MessageFeed>
          
        </div>
        <div className="float-child-image" style={containerStyles}>

            <ImageSlider slides={slides} />
            
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Home;
