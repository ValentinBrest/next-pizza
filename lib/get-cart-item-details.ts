import { Ingredient } from '@prisma/client';
import {
    mapPizzaType,
    PizzaSizesType,
    PizzaTypesType,
} from '../constants/pizza';

export const getCartItemDetails = (
    ingredients: Ingredient[],
    pizzaType?: PizzaTypesType,
    pizzaSize?: PizzaSizesType,
): string => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} ${pizzaSize} см`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(', ');
};
