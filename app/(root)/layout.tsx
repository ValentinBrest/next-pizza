import { Header } from '@/components/shared';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Next Pizza | Главная',
    description: 'The pizza is prepared by Chef Valk',
};

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen">
            <Suspense>
                <Header />
            </Suspense>
            {children}
            {modal}
        </main>
    );
}
