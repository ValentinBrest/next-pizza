import { Title } from './title';
import { FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { FilterCheckboxList } from './filter-checkbox-list';
import { FilterRadioGroup } from './filter-radio-group';

interface FilterPanelProps {
    className?: string;
}

const topFilterCheckboxItems: FilterCheckboxProps[] = [
    { value: '1', text: 'Можно собирать' },
    { value: '2', text: 'Новинки' },
];
const IngridientsCheckboxItems: FilterCheckboxProps[] = [
    { value: '1', text: 'Сырный соус' },
    { value: '2', text: 'Моцарелла' },
    { value: '3', text: 'Чеснок' },
    { value: '4', text: 'Солённые огурчики' },
    { value: '5', text: 'Красный лук' },
    { value: '6', text: 'Томаты' },
    { value: '1', text: 'Сырный соус' },
    { value: '2', text: 'Моцарелла' },
    { value: '3', text: 'Чеснок' },
    { value: '4', text: 'Солённые огурчики' },
    { value: '5', text: 'Красный лук' },
    { value: '6', text: 'Томаты' },
    { value: '1', text: 'Сырный соус' },
    { value: '2', text: 'Моцарелла' },
    { value: '3', text: 'Чеснок' },
    { value: '4', text: 'Солённые огурчики' },
    { value: '5', text: 'Красный лук' },
    { value: '6', text: 'Томаты' },
];
const doughTypeCheckboxItems: FilterCheckboxProps[] = [
    { value: '1', text: 'Традиционное' },
    { value: '2', text: 'Тонкое' },
];

export const FilterPanel = ({ className }: FilterPanelProps) => {
    return (
        <div className={className}>
            <Title text="Фильтрация" className="font-bold" />
            <FilterCheckboxList
                className="flex flex-col gap-4 pt-7 pb-6"
                items={topFilterCheckboxItems}
                defaultItems={topFilterCheckboxItems}
            />

            <div className="pt-6 pb-7 border-y border-y-neutral-100">
                <p className="font-bold mb-4">Цена от и до:</p>
                <div className="flex gap-4">
                    <Input
                        className="h-10 w-24"
                        type="number"
                        min={0}
                        max={50}
                        placeholder="0"
                        defaultValue={0}
                    />
                    <Input
                        className="h-10 w-24"
                        type="number"
                        min={50}
                        max={1000}
                        placeholder="50"
                        defaultValue={1000}
                    />
                </div>
                <RangeSlider className="mt-4" min={0} max={1000} step={10} />
            </div>
            <FilterCheckboxList
                className="flex flex-col gap-4 mt-7 "
                title="Ингридиенты:"
                searchInputPlaceholder="Поиск..."
                items={IngridientsCheckboxItems}
                defaultItems={IngridientsCheckboxItems}
            />
            <FilterRadioGroup
                className="flex flex-col gap-4 mt-7"
                title="Тип теста:"
                items={doughTypeCheckboxItems}
            />
        </div>
    );
};
