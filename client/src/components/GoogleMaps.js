import React from "react";

const GoogleMaps = ({ latitude, longitude }) => {
  const coordinates = `${latitude},${longitude}`;

  const baseMapUrl = "https://www.google.com/maps?q= ";
  const suffixUrl = "&hl=es;&output=embed"
  const mapUrl = `${baseMapUrl}${coordinates}&zoom=12${suffixUrl}`;


  return (
    <iframe
      title="GoogleMap"
      width="600"
      height="350"
      frameborder="0"
      style={{ border: 0 }}
      src={mapUrl}
      allowfullscreen=""
      aria-hidden="false"
      tabindex="0"
    ></iframe>
  );
};

export default GoogleMaps;