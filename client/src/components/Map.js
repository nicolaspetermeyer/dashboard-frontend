import React from "react"
import GoogleMaps from "./GoogleMaps";

const Map = () => {

    const yourLatitude = 47.355278
    const yourLongitude = 8.535000
    
    return (
        <div className="container">
            <h1>Map</h1>
            <div className="googleMap">
                <GoogleMaps latitude={yourLatitude} longitude={yourLongitude} />
            </div>
        </div>
    );
}

export default Map;