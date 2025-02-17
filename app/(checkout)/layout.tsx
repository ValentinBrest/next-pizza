import { Header } from '@/components/shared';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Next Pizza | Оформление заказа',
    description: 'The pizza is prepared by Chef Valk',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-[#F4F1EE]">
            <Suspense>
                <Header hasSearch={false} hasCartButton={false} />
            </Suspense>
            {children}
        </main>
    );
}
