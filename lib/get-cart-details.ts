import { CartDTO } from '@/services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

export type CartStateItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    pizzaType?: number | null;
    pizzaSize?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

type ReturnType = {
    items: CartStateItem[];
    totalAmount: number;
};

export const getItemsDetails = (data: CartDTO): ReturnType => {
    const items = data.items.map((item) => ({
        id: item.id,
        name: item.productItem.product.name,
        price: calcCartItemTotalPrice(item),
        quantity: item.quantity,
        imageUrl: item.productItem.product.imageUrl,
        pizzaType: item.productItem.pizzaType,
        pizzaSize: item.productItem.size,
        ingredients: item.ingredients.map((ingr) => ({
            name: ingr.name,
            price: ingr.price,
        })),
    }));

    return {
        items,
        totalAmount: data.totalAmount,
    };
};
