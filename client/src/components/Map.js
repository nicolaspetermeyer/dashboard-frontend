import React, { useEffect } from "react"
import GoogleMaps from "./GoogleMaps";
import { droneGetCoordinates } from "./functions";

const Map = () => {
    const [coordinates, setCoordinates] = React.useState(null);

    const fetchDroneCoordinates = async () => {
        try {
          const data = await droneGetCoordinates();
          setCoordinates(data); // Set the coordinates in the state
        } catch (error) {
          console.error("Error fetching drone coordinates:", error);
        }
      };
      if (coordinates) {
        var long = coordinates.long
        var lat = coordinates.lat;
      }

  useEffect(() => {
    const intervalId = setInterval(fetchDroneCoordinates, 10000); // 10 seconds
    fetchDroneCoordinates(); // Initial fetch
    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);
    
    return (
        <div className="container">
            <h1>Map</h1>
            <div className="googleMap">
                <GoogleMaps latitude={lat} longitude={long} />
            </div>
        </div>
    );
}

export default Map;