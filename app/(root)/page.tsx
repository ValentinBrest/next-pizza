import {
    Container,
    FilterPanel,
    ProductList,
    Title,
    TopBar,
} from '@/components/shared';
import { findProducts, GetSearchParams } from '@/lib/find-products';
import { Suspense } from 'react';

export default async function Home({
    searchParams,
}: {
    searchParams: GetSearchParams;
}) {
    const categories = await findProducts(searchParams);
    console.log(searchParams);
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
                        <Suspense>
                            <FilterPanel />
                        </Suspense>
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
