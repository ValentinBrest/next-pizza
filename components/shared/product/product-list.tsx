import { cn } from '@/lib/utils';
import { Title } from '../title';
import { ProductCard } from './product-card';

interface ProductListProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    products: any[];
    title: string;
    className?: string;
    categoryId: string;
}

export const ProductList = ({
    className,
    title,
    products,
}: ProductListProps) => {
    return (
        <div className={cn('flex flex-col', className)}>
            <Title text={title} size="lg" className="font-bold" />
            <div className="grid grid-cols-3 gap-12">
                {products.map((pr) => (
                    <ProductCard
                        id={pr.id}
                        key={pr.id}
                        ingredients={pr.ingredients}
                        price={pr.items[0].price}
                        title={pr.title}
                        imageUrl={pr.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};
