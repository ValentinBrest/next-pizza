'use client';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface ProductFormProps {
    product: ProductWithRelations;
    className?: string;
    onSubmit?: VoidFunction;
}

export const ProductForm = ({
    product,
    className,
    onSubmit: _onSubmit,
}: ProductFormProps) => {
    const { addCartItem, loading } = useCartStore();

    const isPizzaForm = Boolean(product.items[0].pizzaType);

    const firstItem = product.items[0];

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId || firstItem.id;

            await addCartItem({ productItemId: itemId, ingredients });
            toast.success(
                `${isPizzaForm ? 'Пицца' : 'Продукт'} "${product.name}" успешно ${isPizzaForm ? 'добавлена' : 'добавлен'} в корзину`,
            );
            _onSubmit?.();
        } catch (error) {
            toast.error(
                `Не удалось добавить ${isPizzaForm ? `пиццу "${product.name}"` : `продукт "${product.name}"`} в корзину`,
            );
            console.error('[onSubmit] product-modal', error);
        }
    };

    return (
        <div className={className}>
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
        </div>
    );
};
