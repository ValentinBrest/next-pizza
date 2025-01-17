import {
    Cart,
    CartItem,
    Ingredient,
    Product,
    ProductItem,
} from '@prisma/client';

export type CartItemDTO = CartItem & {
    ingredients: Ingredient[];
    productItem: ProductItem & {
        product: Product;
    };
};

export interface CartDTO extends Cart {
    items: CartItemDTO[];
}

export interface CreateCartItemValues {
    productItemId: number;
    ingredients?: number[];
}
