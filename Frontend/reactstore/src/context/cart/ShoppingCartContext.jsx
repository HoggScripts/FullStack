import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import ordersService from "../../services/order/ordersService";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const user = useSelector(state => state.user); // Accessing user from Redux

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        } else {
            setCartItems([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const checkout = async () => {
        const total = cartItems.reduce((total, item) => total + item.price, 0);
        const order = {
            userId: user.id,
            orderTotal: total
        };

        try {
            const response = await ordersService.createOrder(order);
            console.log('Order created successfully:', response.data);
            setCartItems([]); 
            localStorage.removeItem('cartItems'); 
            alert('Order placed successfully!'); 
        } catch (error) {
            console.error('Failed to create order:', error);
            alert('Error placing the order.'); 
        }
    };

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <ShoppingCartContext.Provider value={{ cartItems, addToCart, removeFromCart, isCartOpen, openCart, closeCart, checkout }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCart = () => useContext(ShoppingCartContext);

export default ShoppingCartContext;

