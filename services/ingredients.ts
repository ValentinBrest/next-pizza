import { Ingredient } from '@prisma/client';
import { api } from './axios';
import { ApiRoutes } from './constants';

const { INGREDIENTS } = ApiRoutes;

export const getAll = async (): Promise<Ingredient[]> => {
    const { data } = await api.get<Ingredient[]>(INGREDIENTS);

    return data;
};
