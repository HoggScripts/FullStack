// MapComponent.js
import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComponent() {
    // State for the map's viewport settings
    const [viewport, setViewport] = React.useState({
        latitude: 44.6488,  // Central Halifax latitude
        longitude: -63.5752, // Central Halifax longitude
        width: "100vw",
        height: "100vh",
        zoom: 13           // A closer zoom level to make the store location more prominent
    });

    // State for tracking the selected store
    const [selectedStore, setSelectedStore] = React.useState(null);

    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onViewportChange={newViewport => setViewport(prevViewport => ({...prevViewport, ...newViewport}))}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            dragPan={true} // Enable drag to pan
            touchZoomRotate={true} // Enable pinch to zoom and rotate
            className="map-container" // Added for possible custom CSS styling
        >
            <Marker
                latitude={44.6425}  // A fictional location within Halifax
                longitude={-63.5787} // A fictional location within Halifax
            >
                <button
                    className="marker-btn"
                    onClick={e => {
                        e.preventDefault();
                        setSelectedStore("Otaku Books");
                    }}
                    aria-label="View details for Otaku Books"
                >
                    <img src="/marker-icon.png" alt="Store Icon" />
                </button>
            </Marker>

            {selectedStore && (
                <Popup
                    latitude={44.6425}
                    longitude={-63.5787}
                    onClose={() => {
                        setSelectedStore(null);
                    }}
                    className="popup" // Added for possible custom CSS styling
                >
                    <div>
                        <h2>{selectedStore}</h2>
                        <p>Exciting comics just around the corner!</p>
                    </div>
                </Popup>
            )}
        </ReactMapGL>
    );
}

export default MapComponent;

