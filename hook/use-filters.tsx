import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useSet } from 'react-use';

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface Filters {
    selectedPizzaSize: Set<string>;
    selectedDoughType: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
}

export const useFilters = () => {
    const searchParams = useSearchParams();

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get('ingredients')?.split(',')),
    );

    const [selectedDoughType, { toggle: toggleDoughType }] = useSet(
        new Set<string>(searchParams.get('doughType')?.split(',') || []),
    );
    const [selectedPizzaSize, { toggle: togglePizzaSize }] = useSet(
        new Set<string>(searchParams.get('sizePizza')?.split(',') || []),
    );
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    });

    return {
        selectedIngredients,
        toggleIngredients,
        selectedDoughType,
        toggleDoughType,
        selectedPizzaSize,
        togglePizzaSize,
        prices,
        setPrice,
    };
};
