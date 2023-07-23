import React from "react";

const ImageDataDisplay = ({ data }) => {
  const { _id, detections } = data;

  return (
    <div>
      <h2> Image ID: {_id}</h2>
      <h3> Detections: </h3>
      <ul>
        {detections?.map((detection, index) => (
          <li key={index}>
            <p>Label Name: {detection.label_name}</p>
            <p>Tracking ID: {detection.tracking_id}</p>
            <p>Confidence: {detection.confidence}</p>
            <p>Box: [{detection.box.join(", ")}]</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageDataDisplay;
