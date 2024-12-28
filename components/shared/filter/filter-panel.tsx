'use client';
import { useFilters, useIngredients, useQueryFilter } from '@/hook';
import { Ingredient } from '@prisma/client';
import { Input } from '../../ui';
import { RangeSlider } from '../range-slider';
import { Title } from '../title';
import { FilterCheckboxProps } from './filter-checkbox';
import { FilterCheckboxList } from './filter-checkbox-list';

interface FilterPanelProps {
    className?: string;
}

const sizePizzaItems: FilterCheckboxProps[] = [
    { value: '20', text: '20 cм' },
    { value: '30', text: '30 cм' },
    { value: '40', text: '40 cм' },
];

const doughTypeItems: FilterCheckboxProps[] = [
    { value: '1', text: 'Традиционное' },
    { value: '2', text: 'Тонкое' },
];

export const FilterPanel = ({ className }: FilterPanelProps) => {
    const { ingredients, loadingIngredients } = useIngredients();
    const filters = useFilters();

    useQueryFilter(filters);

    const ingridientsCheckboxItems: FilterCheckboxProps[] = ingredients.map(
        (item: Ingredient) => ({
            value: String(item.id),
            text: item.name,
        }),
    );

    return (
        <div className={className}>
            <Title text="Фильтрация" className="font-bold" />
            <FilterCheckboxList
                className="flex flex-col gap-4 pt-7 pb-6"
                items={sizePizzaItems}
                title="Размер пиццы:"
                name="sizePizza"
                selectedValues={filters.selectedPizzaSize}
                onClickCheckbox={filters.togglePizzaSize}
            />

            <div className="pt-6 pb-7 border-y border-y-neutral-100">
                <p className="font-bold mb-4">Цена от и до:</p>
                <div className="flex gap-4 justify-center">
                    <Input
                        className="h-10 w-24"
                        type="number"
                        min={0}
                        placeholder="0"
                        defaultValue={0}
                        value={filters.prices.priceFrom}
                        onChange={(e) =>
                            filters.setPrice((prev) => ({
                                ...prev,
                                priceFrom: Number(e.target.value),
                            }))
                        }
                    />
                    <Input
                        className="h-10 w-24"
                        type="number"
                        min={0}
                        placeholder="100"
                        defaultValue={150}
                        value={filters.prices.priceTo}
                        onChange={(e) =>
                            filters.setPrice((prev) => ({
                                ...prev,
                                priceTo: Number(e.target.value),
                            }))
                        }
                    />
                </div>
                <div className="block mt-4 mr-1">
                    <RangeSlider
                        min={0}
                        max={150}
                        step={1}
                        onValueChange={([priceFrom, priceTo]) =>
                            filters.setPrice({ priceFrom, priceTo })
                        }
                        value={[
                            filters.prices.priceFrom || 0,
                            filters.prices.priceTo || 150,
                        ]}
                    />
                </div>
            </div>
            <FilterCheckboxList
                className="flex flex-col gap-4 mt-7 "
                title="Ингридиенты:"
                searchInputPlaceholder="Поиск..."
                items={ingridientsCheckboxItems}
                defaultItems={ingridientsCheckboxItems}
                loading={loadingIngredients}
                onClickCheckbox={filters.toggleIngredients}
                selectedValues={filters.selectedIngredients}
                name="ingredients"
            />
            <FilterCheckboxList
                className="flex flex-col gap-4 mt-7 "
                title="Тип теста:"
                items={doughTypeItems}
                onClickCheckbox={filters.toggleDoughType}
                selectedValues={filters.selectedDoughType}
                name="dough"
            />
        </div>
    );
};
