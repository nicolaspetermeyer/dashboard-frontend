import React, { useState, useEffect } from "react";
import "../App.css";
import ImageSlider from "./ImageSlider";
import { getId, websocketRequest, droneGetCoordinates } from "./functions";

const Home = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getId()
      .then((slides) => {
        setSlides(slides);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const containerStyles = {
    width: "825px",
    height: "462px",
  };

  return (
    <div>
      {slides.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="float-container">
          <button
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
          </button>

          <div className="float-child-image" style={containerStyles}>
            <ImageSlider slides={slides} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
