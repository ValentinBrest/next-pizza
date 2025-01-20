import { PizzaSizesType, PizzaTypesType } from '@/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';

export const calcTotalPizzaPrice = (
    type: PizzaTypesType,
    size: PizzaSizesType,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedValues: Set<number>,
) => {
    const pizzaPrice =
        items.find((item) => item.pizzaType === type && item.size === size)
            ?.price || 0;

    const ingredientsPrice = ingredients
        .filter((item) => selectedValues.has(item.id))
        .reduce((acc, item) => {
            return acc + item.price;
        }, 0);

    return Number((pizzaPrice + ingredientsPrice).toFixed(2));
};
