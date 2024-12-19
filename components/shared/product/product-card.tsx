import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Title } from '../title';

interface ProductCardProps {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
    description: string;
    className?: string;
}

export const ProductCard = ({
    className,
    imageUrl,
    title,
    description,
    price,
    id,
}: ProductCardProps) => {
    return (
        <div className={className}>
            <Link href={`product/${id}`} className="flex flex-col gap-4">
                <div className="flex justify-center py-6 rounded-2xl h-[260px] bg-secondary">
                    <img
                        className="h-[215px] w-[215px]"
                        src={imageUrl}
                        alt="product"
                    />
                </div>
                <div>
                    <Title text={title} className="font-bold mb-2" />
                    <p className="text-sm text-gray-400 mb-3">{description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-[20px]">
                            от <b>{price} BYN</b>
                        </span>
                        <Button
                            variant={'secondary'}
                            className="text-primary text-[16px]"
                        >
                            <Plus className="mr-1" />
                            Добавить
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
};
