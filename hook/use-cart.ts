import React from 'react';
import { useCartStore } from '../store';
import { CreateCartItemValues } from '../services/dto/cart.dto';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    updateItemQuantity: (id: number, quantity: number) => void;
    deleteCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
    onClickCountButton: (
        id: number,
        quantity: number,
        type: 'plus' | 'minus',
    ) => void;
};

export const useCart = (): ReturnProps => {
    const cartState = useCartStore((state) => state);

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus',
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        cartState.updateItemQuantity(id, newQuantity);
    };

    React.useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return { ...cartState, onClickCountButton };
};
