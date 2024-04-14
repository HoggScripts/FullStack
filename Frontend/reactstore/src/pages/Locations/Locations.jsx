// Locations.jsx
import React from 'react';
import MapComponent from '../../components/MapComponent';

const Locations = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
            <div className="container max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-6">Our Store Location</h1>
                <div className="mb-8 shadow-lg rounded-lg overflow-hidden"> {/* Full width within the container, adjusted margin */}
                    <MapComponent />
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2 mx-auto">
                    <h2 className="text-xl font-semibold mb-3">Otaku Books - Halifax</h2>
                    <p className="mb-2">57 Robert's Street</p>
                    <p className="mb-4">Halifax, NS B3H 2K8</p>
                    <div className="font-semibold text-gray-700">
                        <p>Store Hours:</p>
                        <p>Monday - Friday: 10am - 8pm</p>
                        <p>Saturday - Sunday: 11am - 5pm</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;
