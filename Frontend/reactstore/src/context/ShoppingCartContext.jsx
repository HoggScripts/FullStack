import React, { createContext, useContext, useState, useEffect } from 'react';
const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    useEffect(() => {
        console.log("isCartOpen changed:", isCartOpen);
    }, [isCartOpen]);
    
    const addToCart = (item) => {
        console.log('Adding item to cart:', item);
        setCartItems(prevItems => [...prevItems, item]);
    };
    const removeFromCart = (index) => {
        console.log('Removing item from cart at index:', index);
        setCartItems(prevItems => prevItems.filter((cartItem, i) => i !== index));
    };

    const closeCart = () => {
        console.log("closeCart() called");
        setIsCartOpen(false);
    };

    const openCart = () => {
        console.log("openCart() called");
        setIsCartOpen(true);
    };

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, openCart, closeCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export function useShoppingCart() {
    console.log("useShoppingCart() called");
    return useContext(ShoppingCartContext);
}
