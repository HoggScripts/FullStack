import React from 'react';
import { useShoppingCart} from "../../hooks/useShoppingCart";

const ShoppingCartItem = ({ book }) => {
    const { addToCart } = useShoppingCart();

    const handleAddToCart = () => {
        console.log("This one?")
        addToCart(book);
    };

    return (
        <div>
            <h2>{book.title}</h2>
            <p>{book.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ShoppingCartItem;