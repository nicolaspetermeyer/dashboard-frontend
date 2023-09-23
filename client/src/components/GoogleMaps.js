import React, { useState, useEffect } from "react";

const GoogleMaps = ({ latitude, longitude }) => {
  const coordinates = `${latitude},${longitude}`;

  const baseMapUrl = "https://www.google.com/maps?q= ";
  const suffixUrl = "&hl=es;&output=embed"
  const mapUrl = `${baseMapUrl}${coordinates}&zoom=12${suffixUrl}`;


  return (
    <iframe
      width="500"
      height="300"
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