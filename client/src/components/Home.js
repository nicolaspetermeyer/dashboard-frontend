import React, { useState, useEffect } from "react";
import "../App.css";
import ImageSlider from "./ImageSlider";
import { getId, websocketRequest, droneGetCoordinates } from "./functions";
require ws = require("ws");

const Home = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getId()
      .then((slides) => {
        console.log("slides:", slides);
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
        (console.log("test: ", slides), // test print of data
        (
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
              Test
            ></button>

            <div className="float-child-image" style={containerStyles}>
              <ImageSlider slides={slides} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
