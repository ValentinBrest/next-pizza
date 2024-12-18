import { Title } from './title';
import { FilterCheckbox } from './filter-chackbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';

interface FilterPanelProps {
    className?: string;
}

export const FilterPanel = ({ className }: FilterPanelProps) => {
    return (
        <div className={className}>
            <Title text="Фильтрация" className="font-bold" />
            <div className="flex flex-col gap-4 pt-7 pb-6">
                <FilterCheckbox value="1" text="Можно собирать" />
                <FilterCheckbox value="2" text="Новинки" />
            </div>

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
        </div>
    );
};
