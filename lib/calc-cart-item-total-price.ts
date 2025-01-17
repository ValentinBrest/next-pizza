import { CartItemDTO } from '@/services/dto/cart.dto';

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    const ingredientsPrice = item.ingredients.reduce(
        (acc, ingr) => acc + ingr.price,
        0,
    );

    return (item.productItem.price + ingredientsPrice) * item.quantity;
};
