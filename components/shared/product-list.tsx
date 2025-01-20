'use client';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { useCategories } from '@/store/category';

interface ProductListProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[];
    title: string;
    className?: string;
    categoryId: number;
}

export const ProductList = ({
    className,
    title,
    products,
    categoryId,
}: ProductListProps) => {
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    const setActiveId = useCategories((state) => state.setActiveId);

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveId(categoryId);
        }
    }, [categoryId, title, intersection?.isIntersecting, setActiveId]);

    return (
        <div
            className={cn('flex flex-col', className)}
            ref={intersectionRef}
            id={title}
        >
            {products.length > 0 && (
                <Title text={title} size="lg" className="font-bold" />
            )}
            <div className="grid grid-cols-3 gap-12">
                {products.map((pr) => (
                    <ProductCard
                        id={pr.id}
                        key={pr.id}
                        ingredients={pr.ingredients}
                        price={pr.items[0].price}
                        title={pr.name}
                        imageUrl={pr.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};
