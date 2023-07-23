import React, { Component } from "react";
import ImageDataDisplay from "./ImageDataDisplay";

class ImageData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3500/data")
      .then((response) => response.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        console.log("test: ", data),
        (
          <div>
            <h1>Message</h1>
            <ul>
              {data.map((data) => (
                <li key={data._id}>
                  <div>
                    <h4>Image ID:</h4>
                    <p>{data._id}</p>
                    {data.detections.map((detection) => (
                      <li key={detection._id}>
                        <div>
                          <p>Label Name: {detection.label_name}</p>
                          <p>Tracking ID: {detection.tracking_id}</p>
                          <p>Confidence: {detection.confidence}</p>
                          <p>Box: [{detection.box.join(", ")}]</p>
                        </div>
                      </li>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      );
    }
  }
}

export default ImageData;
