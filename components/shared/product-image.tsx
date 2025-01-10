import { cn } from '@/lib/utils';

interface ProductImageProps {
    className?: string;
    imageUrl: string;
}

export const ProductImage = ({ className, imageUrl }: ProductImageProps) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center relative flex-1 w-full',
                className,
            )}
        >
            <img
                src={imageUrl}
                alt="product"
                className={cn(
                    'relative left-2 top-2 transition-all duration-300 z-10 w-[350px] h-[350px]',
                )}
            />
        </div>
    );
};
