import React from 'react';
import AuthenticationControl from "./AuthenticationControl";
import RoutingButton from "./RoutingButton";
import CartButton from "./CartButton";

const HomeHeader = () => {
    return (
        <div className="bg-black text-white flex items-center justify-between py-2 px-4">
            <div className="flex items-center space-x-4">
                {/* Logo */}
                <img src={`${process.env.PUBLIC_URL}/Logo2.webp`} alt="Company Logo" className="w-12 h-12" />

                {/* Title */}
                <div className="text-xl font-semibold" style={{ fontFamily: "'Shojumaru', cursive" }}>
                    Otaku Books
                </div>
                <img src={`/Logo2.webp`} alt="Company Logo" className="w-12 h-12" />
            </div>



            {/* Authentication Control */}
            <div className="flex space-x-5">
                <RoutingButton label="About Us" to="/aboutus" />
                <RoutingButton label="Locations" to="/locations" />
                <AuthenticationControl />
                <CartButton />
            </div>

        </div>
    );
};

export default HomeHeader;


