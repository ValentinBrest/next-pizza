import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui';
import { CartButton } from './cart-button';
import { Container } from './container';
import { SearchInput } from './search-input';
import { Title } from './title';

interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    return (
        <header className={cn('border border-b', className)}>
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
                    <SearchInput />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant={'outline'} className="gap-1">
                        <User size={16} />
                        Войти
                    </Button>
                    <CartButton />
                </div>
            </Container>
        </header>
    );
};
