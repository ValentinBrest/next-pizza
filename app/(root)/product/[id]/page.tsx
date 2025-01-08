import { Container, ProductImage, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({
    params: { id },
}: {
    params: { id: string };
}) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: { items: true, ingredients: true },
    });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage imageUrl={product.imageUrl} size={20} />

                <div className="w-[490px] bg-[#f9fafb] p-7 rounded-2xl">
                    <Title
                        text={product.name}
                        size="md"
                        className="font-extrabold mb-1"
                    />

                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Natus ipsa velit commodi reiciendis, eaque
                        assumenda, necessitatibus architecto sequi optio neque
                        provident nulla ad ducimus repudiandae minus aspernatur
                        nihil eius distinctio.
                    </p>
                    <GroupVariants
                        items={[
                            { name: 'Маленькая', value: 'small' },
                            { name: 'Средняя', value: 'medium' },
                            { name: 'Большая', value: 'large', disabled: true },
                        ]}
                        value={'medium'}
                    />
                </div>
            </div>
        </Container>
    );
}
