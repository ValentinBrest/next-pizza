import { CartStateItem, getItemsDetails } from '@/lib/get-cart-details';
import { Api } from '@/services/api-client';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { create } from 'zustand';

interface CartState {
    error: boolean;
    loading: boolean;
    items: CartStateItem[];
    totalAmount: number;

    fetchCartItems: () => Promise<void>;
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;
    deleteCartItem: (id: number) => Promise<void>;
    addCartItem: (values: CreateCartItemValues) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    error: false,
    loading: false,
    items: [],
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loading: true });
            const data = await Api.cart.getCart();
            set(getItemsDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getItemsDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    deleteCartItem: async (id: number) => {
        try {
            set({ loading: true });
            const data = await Api.cart.deleteItem(id);
            set(getItemsDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true });
            const data = await Api.cart.addCartItem(values);
            set(getItemsDetails(data));
        } catch (error) {
            console.error(error);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));
