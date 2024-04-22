import React, { useEffect, useRef } from 'react';
import { loadGoogleMapsScript} from "../../services/googlemaps/loadGoogleMapsScript";

const OtakuBooksMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        const callbackName = 'initGoogleMaps'; 

        loadGoogleMapsScript(apiKey, callbackName).then((googleMaps) => {
            const otakuBooksLocation = { lat: 44.655, lng: -63.601 };
            const map = new googleMaps.Map(mapRef.current, {
                zoom: 15,
                center: otakuBooksLocation,
            });

            const marker = new googleMaps.Marker({
                position: otakuBooksLocation,
                map: map,
                title: 'Otaku Books',
                label: 'Otaku Books'
            });

            const infoWindow = new googleMaps.InfoWindow({
                content: '<div><strong>Otaku Books</strong><br>5776 Robert\'s St<br>Halifax, NS B3K 3E7</div>',
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }).catch(error => console.error('Google Maps failed to load:', error));
    }, []);

    return (
        <div style={{ padding: '10rem'}}>
        <div className="flex bg-black">
            <div ref={mapRef} style={{ width: '75%', height: '400px' }} />
            <div className="bg-white shadow-lg rounded-lg p-4" style={{ width: '25%', height: '400px' }}>
                <h2 className="text-lg font-bold">Otaku Books</h2>
                <p>5776 Robert's St</p>
                <p>Halifax, NS B3K 3E7</p>
                <p>Telephone: (902) 835 9995</p>
                <p>Opening Hours: 9am to 5pm Mon-Sat</p>
            </div>
        </div>
        </div>
    );
}

export default OtakuBooksMap;


