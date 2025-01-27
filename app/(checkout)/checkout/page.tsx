'use client';
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
import { FormProvider, useForm } from 'react-hook-form';

export default function CheckoutPage() {
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

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
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
                            loading={loading}
                        />
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
