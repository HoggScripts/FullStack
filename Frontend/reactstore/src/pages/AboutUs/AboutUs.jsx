import React from 'react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
            <img
                src={`${process.env.PUBLIC_URL}/Logo3.webp`}
                alt="Company Logo"
                className="w-1/2 h-1/2 mb-6" 
            />
            <h1 className="text-4xl font-bold text-indigo-500">About Otaku Books</h1>
            <p className="text-xl text-indigo-300 mt-4">
                Nestled in the heart of Halifax, Nova Scotia, Otaku Books is the perfect spot for lovers of anime and manga to discover and explore the rich narratives that Japanese culture has to offer. Our carefully curated selection includes everything from classic manga series to the latest anime-inspired novels.
            </p>
            <p className="text-xl text-indigo-300 mt-2">
                Since our founding in 2021, Otaku Books has quickly become a cherished gathering place for a diverse community of fans and readers. Our mission is to create a welcoming environment where people of all ages can connect over shared passions, discover new stories, and expand their horizons.
            </p>
            <p className="text-xl text-indigo-300 mt-2">
                We pride ourselves on fostering a community spirit and host regular events such as author signings, manga reading clubs, and anime viewing nights. These events are designed to deepen your appreciation of the genre and give you a chance to meet like-minded enthusiasts.
            </p>
            <p className="text-xl text-orange-400 mt-4 font-semibold">
                Excited to dive into the world of anime and manga? Visit Otaku Books today or reach out to our friendly staff to find out more about our current selection and upcoming special events. We're always here to help guide you on your journey through the exciting world of anime and manga!
            </p>
            <p className="text-lg text-indigo-300 mt-2 italic">
                "Explore. Discover. Connect. This is the essence of Otaku Books."
            </p>
        </div>
    );
};

export default AboutUs;



