import { FormInputProps } from '@/components/shared/form/form-input';
import { z } from 'zod';

export const checkoutFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
    lastName: z
        .string()
        .min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
    email: z.string().email({ message: 'Введите корректную почту' }),
    phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
    address: z.string().min(5, { message: 'Введите корректный адрес' }),
    comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export type PersonalInfoItems = Pick<
    FormInputProps,
    'name' | 'required' | 'label' | 'placeholder'
>;

export const personalInfo: PersonalInfoItems[] = [
    {
        name: 'lastName',
        required: true,
        label: 'Фамилия',
        placeholder: 'Введите фамилию',
    },
    {
        name: 'firstName',
        required: true,
        label: 'Имя',
        placeholder: 'Введите имя',
    },
    {
        name: 'phone',
        required: true,
        label: 'Телефон',
        placeholder: 'Введите номер телефона',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Введите адрес электронной почты',
    },
];
