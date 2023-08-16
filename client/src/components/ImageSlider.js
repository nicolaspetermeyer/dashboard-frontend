import { useState } from "react";

const ImageSlider = ({ slides }) => {
  console.log("slides:", slides);
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
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const infoContainerStyles = {
    // Additional styles for the information container
    textAlign: "center",
    padding: "10px", // Optional padding for the information container
    borderRadius: "5px", // Optional border radius for the information container
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "16px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "16px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const goToPrevious = () => {
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div style={sliderStyles}>
      <div style={leftArrowStyles} onClick={goToPrevious}>
        ←
      </div>
      <div style={rightArrowStyles} onClick={goToNext}>
        →
      </div>
      <div style={slideStyles}></div>

      <div style={infoContainerStyles}>
      <p>Image ID: {currentIndex}</p>
      {/* <p>URL: {slides[currentIndex].url}</p> */}
        {slides[currentIndex]?.detections ? (
        slides[currentIndex].detections.map((detection, index) => (
          <div key = {index}>
            Label: {detection.label_name}, Tracking ID: {detection.tracking_id}, Confidence: {detection.confidence}
            </div>
        ))
        ) : (
          <p>Keine Objekte verfügbar zu diesem Bild.</p>
      )}
       
      </div>
    </div>
  );
};
export default ImageSlider;
