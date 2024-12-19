import {
    Container,
    FilterPanel,
    ProductList,
    Title,
    TopBar,
} from '@/components/shared';

const products = [
    {
        id: '1',
        description:
            'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11eef45fdf8d3091a8826b43f4026bab.avif',
        title: 'Баварская',
        price: '25',
        items: [{ price: '25' }],
    },
    {
        id: '2',
        description:
            'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11eef45fdf8d3091a8826b43f4026bab.avif',
        title: 'Мега Ранч',
        price: '16',
        items: [{ price: '16' }],
    },
    {
        id: '3',
        description:
            'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11eef45fdf8d3091a8826b43f4026bab.avif',
        title: 'Кола-барбекю',
        price: '12',
        items: [{ price: '12' }],
    },
    {
        id: '4',
        description:
            'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11eef45fdf8d3091a8826b43f4026bab.avif',
        title: 'Ветчина и огурчики',
        price: '33',
        items: [{ price: '33' }],
    },
    {
        id: '5',
        description:
            'Острая чоризо, острый перец халапеньо, соус барбекю, митболы, томаты, сладкий перец, красный лук, моцарелла',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11eef45fdf8d3091a8826b43f4026bab.avif',
        title: 'Аррива!',
        price: '24',
        items: [{ price: '24' }],
    },
];

export default function Home() {
    return (
        <>
            <Container className="mt-10 ">
                <Title
                    text="Все пиццы"
                    size={'lg'}
                    className="font-extrabold"
                />
            </Container>
            <TopBar />
            <Container className="pb-14 mt-9">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <FilterPanel />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col gap-20">
                            <ProductList
                                products={products}
                                title="Пиццы"
                                categoryId={1}
                            />
                            <ProductList
                                products={products}
                                title="Комбо"
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
