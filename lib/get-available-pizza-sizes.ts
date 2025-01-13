import { Variant } from '@/components/shared/group-variants';
import { pizzaSizes, PizzaTypesType } from '@/constants/pizza';
import { ProductItem } from '@prisma/client';

export const getAvailablePizzaSizes = (
    type: PizzaTypesType,
    items: ProductItem[],
): Variant[] => {
    const filteredPizzasByType = items.filter(
        (item) => item.pizzaType === type,
    );

    return pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(
            (pizza) => Number(pizza.size) === Number(item.value),
        ),
    }));
};
