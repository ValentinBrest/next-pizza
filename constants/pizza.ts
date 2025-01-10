const mapPizzaSize = {
    25: '25 см',
    30: '30 см',
    35: '35 см',
} as const;

export const mapPizzaType = {
    1: 'Традиционная',
    2: 'Тонкая',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    name,
    value,
}));
export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value,
}));

export type PizzaSizesType = keyof typeof mapPizzaSize;
export type PizzaTypesType = keyof typeof mapPizzaType;
