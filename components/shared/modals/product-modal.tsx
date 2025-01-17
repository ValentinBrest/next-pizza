'use client';
import { Dialog, DialogContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/store';

interface ProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ProductModal = ({ className, product }: ProductModalProps) => {
    const { addCartItem } = useCartStore();
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    const firstItem = product.items[0];

    const onAddProduct = () => {
        addCartItem({ productItemId: firstItem.id });
    };
    const onAddPizza = (productItemId: number, ingredients: number[]) => {
        addCartItem({ productItemId, ingredients });
    };
    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}
            >
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        onSubmit={onAddPizza}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        items={product.items}
                        ingredients={product.ingredients}
                    />
                ) : (
                    <ChooseProductForm
                        onSubmit={onAddProduct}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={firstItem.price}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
