import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
    console.log("Provider called");
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on component mount
    console.log("Load effect called")
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            console.log("Loading cart items from localStorage:", storedCartItems);
            setCartItems(JSON.parse(storedCartItems));
        } else {
            console.log("No cart items found in localStorage, setting empty array.");
            setCartItems([]);
        }
    }, []);



    // Save cart to localStorage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        console.log("isCartOpen changed:", isCartOpen);
    }, [isCartOpen]);

    const addToCart = (item) => {
        console.log('Adding item to cart:', item);
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (index) => {
        console.log('Removing item from cart at index:', index);
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const openCart = () => {
        console.log("openCart() called");
        setIsCartOpen(true);
    };

    const closeCart = () => {
        console.log("closeCart() called");
        setIsCartOpen(false);
    };

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, openCart, closeCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}
