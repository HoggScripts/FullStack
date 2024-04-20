
import React, { useState } from 'react';
import AuthContext from "../../context/UserContext";
import UserContext from "../../context/UserContext";

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;


