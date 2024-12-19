'use client';
import { cn } from '@/lib/utils';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input } from '../../ui';
import { ChangeEvent, useMemo, useState } from 'react';

interface FilterCheckboxListProps {
    title?: string;
    items: FilterCheckboxProps[];
    defaultItems: FilterCheckboxProps[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const FilterCheckboxList = ({
    className,
    defaultItems,
    title,
    items,
    limit = 5,
    searchInputPlaceholder,
    onChange,
    defaultValue,
}: FilterCheckboxListProps) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const list = useMemo(() => {
        return showAll
            ? items.filter((item) =>
                  item.text
                      .toLowerCase()
                      .includes(searchValue.toLowerCase().trim()),
              )
            : defaultItems.slice(0, limit);
    }, [showAll, items, defaultItems, limit, searchValue]);

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    return (
        <div className={cn('', className)}>
            {title && <p className="font-bold mb-4">{title}</p>}

            {showAll && searchInputPlaceholder && (
                <Input
                    onChange={onChangeSearchInput}
                    placeholder={searchInputPlaceholder}
                    className="bg-gray-50 border-none"
                />
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollabar">
                {list.map((item, index) => {
                    return (
                        <FilterCheckbox
                            key={index}
                            text={item.text}
                            value={item.value}
                            endAdornment={item.endAdornment}
                            checked={false}
                            onCheckedChange={(ids) => console.log(ids)}
                            className={item.className}
                        />
                    );
                })}
            </div>

            {items.length > limit && (
                <div
                    className={
                        showAll ? 'border-t border-t-neutral-100 mt-4' : ''
                    }
                >
                    <button
                        className="text-primary mt-3"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        {showAll ? 'Скрыть' : '+ Показать всё'}
                    </button>
                </div>
            )}
        </div>
    );
};
