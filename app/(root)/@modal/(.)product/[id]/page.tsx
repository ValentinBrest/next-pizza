import { ProductModal } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProdctModalPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: { items: true, ingredients: true, category: true },
    });

    if (!product) {
        return notFound();
    }

    return <ProductModal product={product} />;
}
