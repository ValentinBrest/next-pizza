import { Product } from '@prisma/client';
import { api } from './axios';
import { ApiRoutes } from './constants';

const { PRODUCTS_SEARCH } = ApiRoutes;

export const search = async (query: string): Promise<Product[]> => {
    const { data } = await api.get<Product[]>(PRODUCTS_SEARCH, {
        params: {
            query,
        },
    });

    return data;
};
