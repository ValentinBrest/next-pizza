import { Variant } from '@/components/shared/group-variants';
import { PizzaSizesType, PizzaTypesType } from '@/constants/pizza';
import { getAvailablePizzaSizes } from '@/lib/get-available-pizza-sizes';
import { ProductItem } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

type ReturnType = {
    size: PizzaSizesType;
    type: PizzaTypesType;
    setSize: (value: PizzaSizesType) => void;
    setType: (value: PizzaTypesType) => void;
    availablePizzasSizes: Variant[];
    toggleIngredients: (value: number) => void;
    selectedValues: Set<number>;
};

export const usePizzaOptions = (items: ProductItem[]): ReturnType => {
    const [size, setSize] = useState<PizzaSizesType>(25);
    const [type, setType] = useState<PizzaTypesType>(1);

    const [selectedValues, { toggle: toggleIngredients }] = useSet(
        new Set<number>([]),
    );

    const availableSizes = getAvailablePizzaSizes(type, items);

    useEffect(() => {
        const isAvailableSize = availableSizes.find(
            (item) => item.value === String(size) && !item.disabled,
        );
        const availableSize = availableSizes.find((item) => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSizesType);
        }
    }, [type]);

    return {
        size,
        type,
        setSize,
        setType,
        availablePizzasSizes: availableSizes,
        toggleIngredients,
        selectedValues,
    };
};
