'use client';
import { Textarea, Label } from '@/components/ui';
import { ErrorText } from '../error-text';
import { useFormContext } from 'react-hook-form';
import { ClearButton } from '../clear-button';
import { RequiredSymbol } from '../required-symbol';

export interface FormTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    required?: boolean;
    label?: string;
    className?: string;
}

export const FormTextarea = ({
    className,
    name,
    required = false,
    placeholder = '',
    label,
    ...props
}: FormTextareaProps) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true });
    };

    return (
        <div className="grid w-full items-center gap-1.5 relative pb-6">
            {label && (
                <p className="font-medium mb-2">
                    <Label htmlFor={name}>{label}</Label>{' '}
                    {required && <RequiredSymbol />}
                </p>
            )}
            <div className="relative">
                <Textarea
                    className={className}
                    {...register(name)}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    {...props}
                />
                {value && <ClearButton onClick={onClickClear} />}
            </div>

            {errorText && (
                <ErrorText
                    text={errorText}
                    className="absolute bottom-0 mt-2"
                />
            )}
        </div>
    );
};
