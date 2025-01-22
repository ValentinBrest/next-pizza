import React from 'react';
import { CheckoutItem } from './checkout-item';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';
import { Card } from '../card';
import { CartStateItem } from '@/lib/get-cart-details';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { PizzaSizesType, PizzaTypesType } from '@/constants/pizza';

interface Props {
    items: CartStateItem[];
    onClickCountButton: (
        id: number,
        quantity: number,
        type: 'plus' | 'minus',
    ) => void;
    deleteCartItem: (id: number) => void;
    loading?: boolean;
    className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
    items,
    onClickCountButton,
    deleteCartItem,
    loading,
    className,
}) => {
    return (
        <Card title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(3)].map((_, index) => (
                          <CheckoutItemSkeleton key={index} />
                      ))
                    : items.map((item) => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              imageUrl={item.imageUrl}
                              details={getCartItemDetails(
                                  item.ingredients,
                                  item.pizzaType as PizzaTypesType,
                                  item.pizzaSize as PizzaSizesType,
                              )}
                              name={item.name}
                              price={item.price}
                              quantity={item.quantity}
                              disabled={item.disabled}
                              onClickCountButton={(type) =>
                                  onClickCountButton(
                                      item.id,
                                      item.quantity,
                                      type,
                                  )
                              }
                              onClickRemove={() => deleteCartItem(item.id)}
                          />
                      ))}
            </div>
        </Card>
    );
};
