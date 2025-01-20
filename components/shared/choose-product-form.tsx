import { cn } from '@/lib/utils';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    loading?: boolean;
    price: number;
    onSubmit?: VoidFunction;
    className?: string;
}

export const ChooseProductForm = ({
    name,
    imageUrl,
    loading,
    onSubmit,
    className,
    price,
}: ChooseProductFormProps) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage imageUrl={imageUrl} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-bold mb-1" />
                <Button
                    loading={loading}
                    onClick={() => onSubmit?.()}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >
                    Добавить в корзину за {price} руб.
                </Button>
            </div>
        </div>
    );
};
