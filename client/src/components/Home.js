import React, { useState, useEffect } from "react";
import "../App.css";
import ImageSlider from "./ImageSlider";
import ImageData from "./ImageData";

async function getId() {
  try {
    const response = await fetch("http://172.23.4.80:3500/data");
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();
    const last5data = data.slice(-5);
    const ids = last5data.map((last5data) => last5data._id);
    const detectionsData = last5data.map((item) => {
      const detections = item.detections.map((detection) => ({
        box: detection.box,
        confidence: detection.confidence,
        label_name: detection.label_name,
        tracking_id: detection.tracking_id,
      }));

      return detections;
    });
    console.log("detectionsData:", detectionsData);

    const publicFolderPath = "http://localhost:3001/images/";
    const slides = ids.map((id, index) => ({
      url: `${publicFolderPath}${id}`,
      title: `Image ${index + 1}`,
      detections: detectionsData[index],
    }));

    return slides;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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
            {/* <div className="float-child-message">
              <ImageData />
            </div> */}
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
