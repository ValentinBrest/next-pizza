import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface RadioItem {
    text: string;
    value: string;
    label?: string;
}

interface FilterRadioGroupProps {
    items: RadioItem[];
    className?: string;
    title?: string;
}

export const FilterRadioGroup = ({
    className,
    items,
    title,
}: FilterRadioGroupProps) => {
    return (
        <div className={className}>
            {title && <p className="font-bold mb-4">{title}</p>}
            <RadioGroup className={cn('flex flex-col gap-4')}>
                {items.map((item) => (
                    <div className="flex items-center gap-3" key={item.value}>
                        <RadioGroupItem
                            value={item.value}
                            id={`radio-${String(item.value)}`}
                        />
                        <label
                            htmlFor={`radio-${String(item.value)}`}
                            className="cursor-pointer leading-none"
                        >
                            {item.text}
                        </label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};
