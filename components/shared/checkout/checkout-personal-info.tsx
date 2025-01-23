import { cn } from '@/lib/utils';
import { Card } from '../card';
import { FormInput } from '../form/form-input';
import { PersonalInfoItems } from '@/constants/checkout-form';

interface CheckoutPersonalInfoProps {
    className?: string;
    items: PersonalInfoItems[];
}

export const CheckoutPersonalInfo = ({
    className,
    items,
}: CheckoutPersonalInfoProps) => {
    return (
        <div className={cn('', className)}>
            <Card title="2.Персональная информация">
                <div className="grid grid-cols-2 gap-5">
                    {items.map((item, index) => (
                        <FormInput
                            name={item.name}
                            label={item.label}
                            key={index}
                            placeholder={item.placeholder}
                            required={item.required}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};
