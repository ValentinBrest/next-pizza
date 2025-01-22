'use client';
import { Card, Container, Title } from '@/components/shared';
import { CheckoutCart, CheckoutSidebar } from '@/components/shared/checkout';
import { Input, Label, Textarea } from '@/components/ui';
import { useCart } from '@/hook';

export default function CheckoutPage() {
    const { totalAmount, items, deleteCartItem, loading, onClickCountButton } =
        useCart();

    return (
        <Container>
            <Title
                text="Оформление заказа"
                size="lg"
                className="font-bold mt-6"
            />
            <div className="flex gap-10 mt-7 pb-20">
                <div className="flex flex-col gap-5 flex-1">
                    <CheckoutCart
                        onClickCountButton={onClickCountButton}
                        deleteCartItem={deleteCartItem}
                        items={items}
                        loading={loading}
                    />
                    <Card title="2.Персональная информация">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="firstName">Имя</Label>
                                <Input id="firstName" placeholder="Имя" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="lastName">Фамилия</Label>
                                <Input id="lastName" placeholder="Фамилия" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="phone">Телефон</Label>
                                <Input id="phone" placeholder="Телефон" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" />
                            </div>
                        </div>
                    </Card>
                    <Card title="3.Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="address">Введите адрес</Label>
                                <Input id="address" placeholder="Адрес" />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="comment">
                                    Введите комментарий к заказу
                                </Label>
                                <Textarea
                                    className="h-[100px]"
                                    id="comment"
                                    placeholder="Комментарий"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-[450px]">
                    <CheckoutSidebar
                        totalAmount={totalAmount}
                        loading={false}
                    />
                </div>
            </div>
        </Container>
    );
}
