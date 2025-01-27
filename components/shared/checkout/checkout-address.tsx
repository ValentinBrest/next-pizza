import { cn } from '@/lib/utils';
import { FormInput, FormTextarea } from '../form';
import { Card } from '../card';
import { AdressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';

interface CheckoutAddressProps {
    className?: string;
}

export const CheckoutAddress = ({ className }: CheckoutAddressProps) => {
    const { control } = useFormContext();

    return (
        <Card title="3.Адрес доставки" className={cn('', className)}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <>
                            <AdressInput onChange={field.onChange} />
                            {fieldState.error?.message && (
                                <ErrorText text={fieldState.error.message} />
                            )}
                        </>
                    )}
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
