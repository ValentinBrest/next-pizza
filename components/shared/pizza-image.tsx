import { PizzaSizesType } from '@/constants/pizza';
import { cn } from '@/lib/utils';

interface ProductPizzaImageProps {
    className?: string;
    imageUrl: string;
    size: PizzaSizesType;
}

export const ProductPizzaImage = ({
    className,
    imageUrl,
    size = 25,
}: ProductPizzaImageProps) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center relative flex-1 w-[500px] h-[500px]',
                className,
            )}
        >
            <img
                src={imageUrl}
                alt="pizza"
                className={cn(
                    'relative left-[12px] top-[13px] transition-all duration-300 z-10 ',
                    {
                        'w-[300px] h-[300px]': size === 25,
                        'w-[400px] h-[400px]': size === 30,
                        'w-[500px] h-[500px]': size === 35,
                    },
                )}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </div>
    );
};
