import React from "react";
import ReactPlayer from "react-player";
import "../App.css";

const Stream = () => {
  return (
    <div className="stream">
      <ReactPlayer
        playing
        loop
        width="100%"
        height="100%"
        url="http://localhost:3001/video/index.m3u8"
      />
    </div>
  );
};

export default Stream;
