import { cn } from '@/lib/utils';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                    <Image src={'/logo.png'} alt="" width={35} height={35} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">
                            Next Pizza
                        </h1>
                        <p className="text-sm text-gray-400 leading-4">
                            вкуснее уже некуда
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant={'outline'} className="gap-1">
                        <User size={16} />
                        Войти
                    </Button>
                    <Button className="group relative">
                        <b>0 BYN</b>
                        <span className="h-full w-[1px] bg-white/30 mx-3"></span>
                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingCart
                                size={16}
                                strokeWidth={2}
                                className="relative"
                            />
                            <b>0</b>
                        </div>
                        <ArrowRight
                            size={20}
                            strokeWidth={1.5}
                            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </Button>
                </div>
            </Container>
        </header>
    );
};
