'use client';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '../../ui';
import { ChangeEvent, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterCheckboxListProps {
    title?: string;
    items: FilterCheckboxProps[];
    defaultItems?: FilterCheckboxProps[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    defaultValue?: string[];
    className?: string;
    selectedValues: Set<string>;
    name: string;
}

export const FilterCheckboxList = ({
    className,
    defaultItems,
    title,
    items,
    limit = 5,
    searchInputPlaceholder,
    onClickCheckbox,
    defaultValue,
    loading,
    selectedValues,
    name,
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
            : (defaultItems || items).slice(0, limit);
    }, [showAll, items, defaultItems, limit, searchValue]);

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                {title && <p className="font-bold mb-4">{title}</p>}
                <div className="flex flex-col gap-4">
                    {Array(limit)
                        .fill(5)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full h-[20px] rounded-full"
                            />
                        ))}
                </div>

                <Skeleton className="w-full h-[25px] rounded-full mt-2" />
            </div>
        );
    }

    return (
        <div className={className}>
            {title && <p className="font-bold mb-4">{title}</p>}

            {showAll && searchInputPlaceholder && (
                <Input
                    onChange={onChangeSearchInput}
                    placeholder={searchInputPlaceholder}
                    className="bg-gray-50 border-none"
                />
            )}

            <div
                className={cn(
                    'flex flex-col gap-4 max-h-96 pr-2',
                    items.length > limit && 'overflow-auto scrollabar',
                )}
            >
                {list.map((item, index) => {
                    return (
                        <FilterCheckbox
                            key={index}
                            text={item.text}
                            value={item.value}
                            endAdornment={item.endAdornment}
                            checked={selectedValues?.has(item.value)}
                            onCheckedChange={() =>
                                onClickCheckbox?.(item.value)
                            }
                            className={item.className}
                            listName={name}
                        />
                    );
                })}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100' : ''}>
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
