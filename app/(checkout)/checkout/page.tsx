'use client';
import { createOrder } from '@/app/api/actions';
import { Container, Title } from '@/components/shared';
import {
    CheckoutAddress,
    CheckoutCart,
    CheckoutPersonalInfo,
    CheckoutSidebar,
} from '@/components/shared/checkout';
import {
    checkoutFormSchema,
    CheckoutFormValues,
    personalInfo,
} from '@/constants/checkout-form';
import { useCart } from '@/hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const [submitting, setSubmitting] = useState(false);
    const { totalAmount, items, deleteCartItem, loading, onClickCountButton } =
        useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
            comment: '',
        },
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
                icon: '✅',
            });

            if (url) {
                location.href = url;
            }
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }
    };

    return (
        <Container>
            <Title
                text="Оформление заказа"
                size="lg"
                className="font-bold mt-6"
            />
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex gap-10 mt-7 pb-20"
                >
                    <div className="flex flex-col gap-5 flex-1">
                        <CheckoutCart
                            onClickCountButton={onClickCountButton}
                            deleteCartItem={deleteCartItem}
                            items={items}
                            loading={loading}
                        />

                        <CheckoutPersonalInfo
                            items={personalInfo}
                            className={
                                loading ? 'opacity-40 pointer-events-none' : ''
                            }
                        />
                        <CheckoutAddress
                            className={
                                loading ? 'opacity-40 pointer-events-none' : ''
                            }
                        />
                    </div>
                    <div className="w-[450px]">
                        <CheckoutSidebar
                            totalAmount={totalAmount}
                            loading={loading || submitting}
                        />
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
