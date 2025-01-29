'use client';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui';
import { Container } from './container';
import { SearchInput } from './search-input';
import { Title } from './title';
import { CartButton } from './cart';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

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
                    <Button variant={'outline'} className="gap-1">
                        <User size={16} />
                        Войти
                    </Button>
                    {hasCartButton && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
