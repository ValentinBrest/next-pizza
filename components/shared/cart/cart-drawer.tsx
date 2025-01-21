'use client';
import { PizzaSizesType, PizzaTypesType } from '@/constants/pizza';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { cn, numWord } from '@/lib/utils';
import { useCartStore } from '@/store';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import {
    Button,
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { CartEmpty } from './cart-empty';

interface CartDrawerProps {
    className?: string;
    children: ReactNode;
}

export const CartDrawer = ({ className, children }: CartDrawerProps) => {
    const {
        fetchCartItems,
        items,
        totalAmount,
        updateItemQuantity,
        deleteCartItem,
        loading,
    } = useCartStore();

    const onClickCountButton = (
        id: number,
        quantity: number,
        type: 'plus' | 'minus',
    ) => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent
                className={cn(
                    'flex flex-col justify-between pb-0 bg-[#F4F1EE]',
                    className,
                )}
            >
                <>
                    {items.length ? (
                        <>
                            <SheetHeader>
                                <SheetTitle>
                                    {` В корзине ${items.length} ${numWord(items.length, ['товар', 'товара', 'товаров'])}`}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="-mx-6 mt-5 overflow-auto flex-1 flex flex-col gap-2">
                                {items.map((item) => (
                                    <CartDrawerItem
                                        details={getCartItemDetails(
                                            item.ingredients,
                                            item.pizzaType as PizzaTypesType,
                                            item.pizzaSize as PizzaSizesType,
                                        )}
                                        id={item.id}
                                        key={item.id}
                                        imageUrl={item.imageUrl}
                                        name={item.name}
                                        price={item.price}
                                        quantity={item.quantity}
                                        onClickCountButton={(type) =>
                                            onClickCountButton(
                                                item.id,
                                                item.quantity,
                                                type,
                                            )
                                        }
                                        onClickRemove={() =>
                                            deleteCartItem(item.id)
                                        }
                                    />
                                ))}
                            </div>
                            <SheetFooter className="-mx-6 bg-white p-8">
                                <div className="w-full">
                                    <div className="flex mb-4">
                                        <span className="flex flex-1 text-lg text-neutral-500">
                                            Итого
                                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                                        </span>

                                        <span className="font-bold text-lg">
                                            {Number(totalAmount.toFixed(2))}{' '}
                                            руб.
                                        </span>
                                    </div>
                                    <Link href="/cart">
                                        <Button
                                            loading={loading}
                                            type="submit"
                                            className="w-full h-12 text-base"
                                        >
                                            Оформить заказ
                                            <ArrowRight className="w-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    ) : (
                        <CartEmpty />
                    )}
                </>
            </SheetContent>
        </Sheet>
    );
};
