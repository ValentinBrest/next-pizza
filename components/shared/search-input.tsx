'use client';
import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface SearchInputProps {
    className?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [focused, setFocused] = useState(false);
    const ref = useRef(null);

    useClickAway(ref, () => {
        setFocused(false);
    });

    useDebounce(
        () => {
            Api.products.search(searchInput).then((data) => setProducts(data));
        },
        500,
        [searchInput],
    );

    const onClick = () => {
        setFocused(false);
        setSearchInput('');
        setProducts([]);
    };
    return (
        <>
            {focused && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30 cursor-pointer"></div>
            )}
            <div
                ref={ref}
                className={cn(
                    'flex justify-center bg-white/30 h-12 rounded-2xl relative z-30',
                    className,
                )}
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <input
                    type="text"
                    className="rounded-2xl outline-none w-full bg-gray-50 pl-11 placeholder:text-[16px]"
                    placeholder="Найти..."
                    onFocus={() => setFocused(true)}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <div
                    className={cn(
                        'absolute top-14 rounded-xl shadow-md bg-white w-full opacity-0 invisible transition-all duration-200',
                        focused && 'opacity-100 visible',
                        searchInput && products.length === 0 && 'min-h-[100px]',
                    )}
                >
                    {products.length ? (
                        products.map((item) => (
                            <Link
                                onClick={onClick}
                                key={item.id}
                                className="flex items-center justify-start h-full px-3 py-2 gap-3 hover:bg-primary/10"
                                href={`/product/${item.id}`}
                            >
                                <img
                                    className="w-8 h-8"
                                    src={item.imageUrl}
                                    alt={item.name}
                                />
                                <span>{item.name}</span>
                            </Link>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-[100px]">
                            Ничего не найдено
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
