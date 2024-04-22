import { useContext } from 'react';
import { ShoppingCartContext } from '../context/cart/ShoppingCartContext';

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}
