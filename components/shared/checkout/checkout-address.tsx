import { cn } from '@/lib/utils';
import { FormInput, FormTextarea } from '../form';
import { Card } from '../card';

interface CheckoutAddressProps {
    className?: string;
}

export const CheckoutAddress = ({ className }: CheckoutAddressProps) => {
    return (
        <Card title="3.Адрес доставки" className={cn('', className)}>
            <div className="flex flex-col gap-5">
                <FormInput
                    name="address"
                    required={true}
                    label="Адрес"
                    placeholder="Введите адрес"
                />
                <FormTextarea
                    className="h-[100px]"
                    name="comment"
                    label="Комментарий"
                    placeholder="Введите комментарий к заказу"
                />
            </div>
        </Card>
    );
};
