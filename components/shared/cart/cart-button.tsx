'use client';
import { cn, rounded } from '@/lib/utils';
import { ArrowRight, ShoppingCart } from 'lucide-react';

import { useCartStore } from '@/store';
import { CartDrawer } from './cart-drawer';
import { Button } from '@/components/ui';

interface CartButtonProps {
    className?: string;
}

export const CartButton = ({ className }: CartButtonProps) => {
    const { items, totalAmount, loading } = useCartStore();
    return (
        <CartDrawer>
            <Button
                loading={loading}
                className={cn(
                    'group relative',
                    { 'w-[105px]': loading },
                    className,
                )}
            >
                <b>{rounded(totalAmount)} руб.</b>
                <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart
                        size={16}
                        strokeWidth={2}
                        className="relative"
                    />
                    <b>{items.length}</b>
                </div>
                <ArrowRight
                    size={20}
                    strokeWidth={1.5}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
