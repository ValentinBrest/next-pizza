'use client';
import { cn } from '@/lib/utils';
import { useCategories } from '@/store/category';
import { Link } from 'react-scroll';

interface CategoriesProps {
    className?: string;
}

const cats = [
    { id: 1, name: 'Пиццы' },
    { id: 2, name: 'Комбо' },
    { id: 3, name: 'Закуски' },
    { id: 4, name: 'Коктейли' },
    { id: 5, name: 'Кофе' },
    { id: 6, name: 'Напитки' },
    { id: 7, name: 'Десерты' },
];

export const Categories = ({ className }: CategoriesProps) => {
    const categoryActiveId = useCategories((state) => state.activeId);

    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',
                className,
            )}
        >
            {cats.map(({ id, name }) => {
                return (
                    <Link
                        key={id}
                        smooth={true}
                        offset={-100}
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            categoryActiveId === id &&
                                'bg-white shadow-md shadow-gray-200 text-primary',
                        )}
                        to={name}
                    >
                        <button>{name}</button>
                    </Link>
                );
            })}
        </div>
    );
};
