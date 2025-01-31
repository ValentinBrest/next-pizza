'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CartButton } from './cart';
import { Container } from './container';
import { AuthModal } from './modals';
import { ProfileButton } from './profile-button';
import { SearchInput } from './search-input';
import { Title } from './title';

interface HeaderProps {
    className?: string;
    hasSearch?: boolean;
    hasCartButton?: boolean;
}

export const Header = ({
    className,
    hasSearch = true,
    hasCartButton = true,
}: HeaderProps) => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage =
                'Заказ успешно оплачен! Информация отправлена на почту.';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-4">
                <Link href={'/'} className="flex items-center gap-4">
                    <Image src={'/logo.png'} alt="" width={35} height={35} />
                    <div>
                        <Title
                            text="Next Pizza"
                            className="text-2xl uppercase font-black"
                        />
                        <p className="text-sm text-gray-400 leading-4">
                            вкуснее уже некуда
                        </p>
                    </div>
                </Link>

                <div className="mx-10 flex-1">
                    {hasSearch && <SearchInput />}
                </div>

                <div className="flex items-center gap-3">
                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />

                    <ProfileButton
                        onClickSignIn={() => setOpenAuthModal(true)}
                    />
                    {hasCartButton && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
