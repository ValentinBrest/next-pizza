import { cn } from '@/lib/utils';
import { Checkbox } from '../../ui';

export interface FilterCheckboxProps {
    text: string;
    value: string;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    endAdornment?: boolean;
    className?: string;
}

export const FilterCheckbox = ({
    className,
    text,
    value,
    endAdornment,
    onCheckedChange,
    checked,
}: FilterCheckboxProps) => {
    return (
        <div className={cn('flex items-center gap-3', className)}>
            <Checkbox
                id={`checkbox-${String(value)}`}
                value={value}
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="h-5 w-5 rounded-[8px]"
            />
            <label
                htmlFor={`checkbox-${String(value)}`}
                className="cursor-pointer leading-none"
            >
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
