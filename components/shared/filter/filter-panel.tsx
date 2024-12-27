'use client';
import { useFilterIngredients } from '@/hook/useFilterIngredients';
import { Ingredient } from '@prisma/client';
import { useState } from 'react';
import { useSet } from 'react-use';
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
    const [selectedDoughType, { toggle: toggleDoughType }] = useSet(
        new Set<string>([]),
    );
    const [selectedPizzaSize, { toggle: togglePizzaSize }] = useSet(
        new Set<string>([]),
    );
    const [rangeFilter, setRangeFilter] = useState({
        from: 0,
        to: 1000,
    });
    const { ingredients, loading, selectedIngredients, toggleIngr } =
        useFilterIngredients();

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
                selectedValues={selectedPizzaSize}
                onClickCheckbox={togglePizzaSize}
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
                        value={rangeFilter.from}
                        onChange={(e) =>
                            setRangeFilter((prev) => ({
                                ...prev,
                                from: Number(e.target.value),
                            }))
                        }
                    />
                    <Input
                        className="h-10 w-24"
                        type="number"
                        min={0}
                        placeholder="1000"
                        defaultValue={1000}
                        value={rangeFilter.to}
                        onChange={(e) =>
                            setRangeFilter((prev) => ({
                                ...prev,
                                to: Number(e.target.value),
                            }))
                        }
                    />
                </div>
                <div className="block mt-4 mr-1">
                    <RangeSlider
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={([from, to]) =>
                            setRangeFilter({ from, to })
                        }
                        value={[rangeFilter.from, rangeFilter.to]}
                    />
                </div>
            </div>
            <FilterCheckboxList
                className="flex flex-col gap-4 mt-7 "
                title="Ингридиенты:"
                searchInputPlaceholder="Поиск..."
                items={ingridientsCheckboxItems}
                defaultItems={ingridientsCheckboxItems}
                loading={loading}
                onClickCheckbox={toggleIngr}
                selectedValues={selectedIngredients}
                name="ingredients"
            />
            <FilterCheckboxList
                className="flex flex-col gap-4 mt-7 "
                title="Тип теста:"
                items={doughTypeItems}
                onClickCheckbox={toggleDoughType}
                selectedValues={selectedDoughType}
                name="dough"
            />
        </div>
    );
};
