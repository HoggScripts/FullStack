import React from 'react';
import { Offcanvas } from "react-bootstrap";
import { useShoppingCart} from "../../hooks/useShoppingCart";

const Cart = () => {
    const { cartItems, closeCart, isCartOpen, removeFromCart, checkout } = useShoppingCart();

  
    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
 
    const tax = subtotal * 0.15;
  
    const total = subtotal + tax;

    return (
        <Offcanvas show={isCartOpen} onHide={closeCart} placement="end" className="bg-gray-100">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item, index) => (
                            <div key={`${item.bookId}-${index}`} className="mb-4 p-2 flex border-b border-gray-300">
                                <div className="flex-grow">
                                    <img
                                        src={`${process.env.PUBLIC_URL}${item.coverImageUrl}`}
                                        alt={item.title}
                                        className="w-24 h-32 object-cover mr-4" />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-lg font-bold">{item.title}</h2>
                                    <p className="text-sm">${item.price.toFixed(2)}</p>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="mt-2 py-1 px-2 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                                        Remove from Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 border-t border-gray-300">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal:</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (15%):</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={checkout}
                                className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition-colors">
                                Confirm Order
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No items in your cart.</p>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Cart;
