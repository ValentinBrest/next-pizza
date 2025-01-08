import {
    Container,
    FilterPanel,
    ProductList,
    Title,
    TopBar,
} from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    items: true,
                    ingredients: true,
                },
            },
        },
    });

    return (
        <>
            <Container className="mt-10 ">
                <Title
                    text="Все пиццы"
                    size={'lg'}
                    className="font-extrabold"
                />
            </Container>
            <TopBar
                categories={categories.filter(
                    (item) => item.products.length > 0,
                )}
            />
            <Container className="pb-14 mt-9">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <FilterPanel />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-20">
                            {categories.map((category) => (
                                <ProductList
                                    key={category.id}
                                    products={category.products}
                                    title={category.name}
                                    categoryId={category.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
