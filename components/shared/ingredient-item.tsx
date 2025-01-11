import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface IngredientItemProps {
    imageUrl: string;
    name: string;
    price: number;
    onClick?: () => void;
    active?: boolean;
    className?: string;
}

export const IngredientItem = ({
    className,
    imageUrl,
    name,
    onClick,
    price,
    active,
}: IngredientItemProps) => {
    return (
        <div
            className={cn(
                'relative flex flex-col items-center justify-between rounded-md ursor-pointer shadow-md bg-white p-1 w-32 text-center',
                { 'border border-primary': active },
                className,
            )}
            onClick={onClick}
        >
            {active && (
                <CircleCheck className="absolute top-2 right-2 text-primary" />
            )}
            <img width={110} height={110} src={imageUrl} alt="ingredient" />
            <span className="text-xs mb-1">{name}</span>
            <span className="font-bold">{price} руб.</span>
        </div>
    );
};
