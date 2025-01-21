'use client';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../product-form';

interface ProductModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ProductModal = ({ className, product }: ProductModalProps) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
                    className,
                )}
            >
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    );
};
