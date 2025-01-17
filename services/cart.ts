import { api } from './axios';
import { ApiRoutes } from './constants';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

const { CART } = ApiRoutes;

export const getCart = async (): Promise<CartDTO> => {
    const { data } = await api.get<CartDTO>(CART);

    return data;
};

export const updateItemQuantity = async (
    id: number,
    quantity: number,
): Promise<CartDTO> => {
    const { data } = await api.patch<CartDTO>(CART + `/${id}`, { quantity });

    return data;
};

export const deleteItem = async (id: number): Promise<CartDTO> => {
    const { data } = await api.delete<CartDTO>(CART + `/${id}`);

    return data;
};

export const addCartItem = async (
    values: CreateCartItemValues,
): Promise<CartDTO> => {
    const { data } = await api.post<CartDTO>(CART, values);

    return data;
};
