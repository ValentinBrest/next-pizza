'use client';
import { Dialog, DialogContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '../choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '../choose-pizza-form';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';

interface ProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ProductModal = ({ className, product }: ProductModalProps) => {
    const { addCartItem, loading } = useCartStore();
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType);

    const firstItem = product.items[0];

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId || firstItem.id;

            await addCartItem({ productItemId: itemId, ingredients });
            toast.success(
                `${isPizzaForm ? 'Пицца' : 'Продукт'} "${product.name}" успешно ${isPizzaForm ? 'добавлена' : 'добавлен'} в корзину`,
            );
            router.back();
        } catch (error) {
            toast.error(
                `Не удалось добавить ${isPizzaForm ? `пиццу "${product.name}"` : `продукт "${product.name}"`} в корзину`,
            );
            console.error('[onSubmit] product-modal', error);
        }
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
                        onSubmit={onSubmit}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        items={product.items}
                        ingredients={product.ingredients}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        onSubmit={onSubmit}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        price={firstItem.price}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
