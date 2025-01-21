import { cn } from '@/lib/utils';
import { Title } from '../title';
import { Button, SheetClose } from '../../ui';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface CartEmptyProps {
    className?: string;
}

export const CartEmpty = ({ className }: CartEmptyProps) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center h-full',
                className,
            )}
        >
            <Image
                width={200}
                height={200}
                src="/assets/images/empty-box.png"
                alt="empty-box"
            />
            <Title
                text="Ваша корзина пуста"
                className="text-primary font-extrabold"
                size="sm"
            />
            <SheetClose className="-mx-6 p-8">
                <Button className="w-full h-12 text-base">
                    Назад
                    <ArrowLeft className="w-5 ml-2" />
                </Button>
            </SheetClose>
        </div>
    );
};
