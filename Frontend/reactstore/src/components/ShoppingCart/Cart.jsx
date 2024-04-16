import React from 'react';
import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from '../../context/ShoppingCartContext';

const Cart = () => {
    const { cartItems, closeCart, isCartOpen, removeFromCart } = useShoppingCart();

    console.log("isCartOpen according to Cart.jsx is", isCartOpen);

    return (
        <Offcanvas show={isCartOpen} onHide={closeCart} placement="end" className="bg-gray-100">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                        console.log('Rendering item:', item);
                        return (
                            <div key={`${item.bookId}-${index}`} className="mb-4 p-2 flex border-b border-gray-300">
                                <div className="flex-grow">
                                    <img
                                        src={`${process.env.PUBLIC_URL}${item.coverImageUrl}`}
                                        alt={item.title}
                                        className="w-24 h-32 object-cover mr-4" />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-lg font-bold">{item.title}</h2>
                                    <p className="text-sm">${item.price}</p>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="mt-2 py-1 px-2 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No items in your cart.</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Cart;
