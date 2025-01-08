import { Header } from '@/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Next Pizza | Главная',
    description: 'The pizza is prepared by Chef Valk',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen">
            <Header />
            {children}
        </main>
    );
}
