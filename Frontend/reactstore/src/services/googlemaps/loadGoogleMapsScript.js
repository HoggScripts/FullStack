

export const loadGoogleMapsScript = (apiKey, callbackName) => {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google.maps);
            return;
        }

        window[callbackName] = () => resolve(window.google.maps);

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`;
        script.async = true;
        script.defer = true;
        script.onerror = () => reject(new Error('Google Maps script failed to load.'));
        document.head.appendChild(script);
    });
};
