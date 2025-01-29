import { useRouter } from 'next/navigation';
import qs from 'qs';
import { useEffect, useRef } from 'react';
import { Filters } from './use-filters';

export const useQueryFilter = (filters: Filters) => {
    const isMounted = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                ingredients: Array.from(filters.selectedIngredients),
                doughType: Array.from(filters.selectedDoughType),
                sizePizza: Array.from(filters.selectedPizzaSize),
                ...filters.prices,
            };

            const query = qs.stringify(params, { arrayFormat: 'comma' });

            router.push(`/?${query}`, {
                scroll: false,
            });
        }
        isMounted.current = true;
    }, [filters]);
};
