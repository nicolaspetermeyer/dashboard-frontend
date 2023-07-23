import React from 'react';

function ImageContainer(props) {
  return (
    <div className="image-container">
      <img src={props.src} alt={props.alt} />
      <p>{props.caption}</p>
    </div>
  );
}

export default ImageContainer;