import { cn } from '@/lib/utils';
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';

interface ChooseProductFormProps {
    imageUrl: string;
    name: string;
    loading?: boolean;
    onSubmit?: (itemId: number, ingredients: number[]) => void;
    className?: string;
}

export const ChooseProductForm = ({
    name,
    imageUrl,
    loading,
    onSubmit,
    className,
}: ChooseProductFormProps) => {
    return (
        <div className={cn(className, 'flex flex-1')}>
            <ProductImage imageUrl={imageUrl} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-bold mb-1" />
                <p className="text-gray-400">{'textDetaills'}</p>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Добавить в корзину за {5} ₽
                </Button>
            </div>
        </div>
    );
};
