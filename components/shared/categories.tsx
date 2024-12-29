'use client';
import { cn } from '@/lib/utils';
import { useCategories } from '@/store/category';
import { Category } from '@prisma/client';
import { Link } from 'react-scroll';

interface CategoriesProps {
    className?: string;
    items: Category[];
}

export const Categories = ({ className, items }: CategoriesProps) => {
    const categoryActiveId = useCategories((state) => state.activeId);

    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl',
                className,
            )}
        >
            {items.map(({ id, name }) => {
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
