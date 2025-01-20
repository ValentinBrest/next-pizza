import { Prisma } from '@prisma/client';
import { categories, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

const randomDecimalNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) * 100 + min * 100) / 100;
};

const generateProductItem = ({
    productId,
    pizzaType,
    size,
    price,
}: {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 25 | 30 | 35;
    price?: [minPrice: number, maxPrice: number];
}) => {
    return {
        productId,
        price: randomDecimalNumber(price?.[0] || 4, price?.[1] || 18),
        pizzaType,
        size,
    } as Prisma.ProductItemUncheckedCreateInput;
};

async function create() {
    await prisma.user.createMany({
        data: [
            {
                fullName: 'John Doe',
                email: 'QxI3K@example.com',
                password: hashSync('111111', 10),
                role: 'USER',
                verified: new Date(),
            },
            {
                fullName: 'John Adminovsky',
                email: 'RcX9o@example.com',
                password: hashSync('111111', 10),
                role: 'ADMIN',
                verified: new Date(),
            },
        ],
    });

    await prisma.category.createMany({
        data: categories,
    });

    await prisma.ingredient.createMany({
        data: ingredients,
    });

    await prisma.product.createMany({
        data: products,
    });

    const pizza1 = await prisma.product.create({
        data: {
            name: 'Пепперони фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(0, 5),
            },
        },
    });

    const pizza2 = await prisma.product.create({
        data: {
            name: 'Сырная',
            imageUrl:
                'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(5, 10),
            },
        },
    });

    const pizza3 = await prisma.product.create({
        data: {
            name: 'Чоризо фреш',
            imageUrl:
                'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
            categoryId: 1,
            ingredients: {
                connect: ingredients.slice(10, 40),
            },
        },
    });

    await prisma.productItem.createMany({
        data: [
            // Пицца "Пепперони фреш"
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 1,
                size: 25,
                price: [12, 18],
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 30,
                price: [20, 28],
            }),
            generateProductItem({
                productId: pizza1.id,
                pizzaType: 2,
                size: 35,
                price: [30, 44],
            }),

            // Пицца "Сырная"
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 25,
                price: [11, 18],
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 30,
                price: [22, 31],
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 1,
                size: 35,
                price: [33, 44],
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 25,
                price: [13, 20],
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 30,
                price: [24, 32],
            }),
            generateProductItem({
                productId: pizza2.id,
                pizzaType: 2,
                size: 35,
                price: [33, 43],
            }),

            // Пицца "Чоризо фреш"
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 1,
                size: 25,
                price: [12, 17],
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 30,
                price: [20, 31],
            }),
            generateProductItem({
                productId: pizza3.id,
                pizzaType: 2,
                size: 35,
                price: [33, 45],
            }),

            // Остальные продукты
            generateProductItem({ productId: 1 }),
            generateProductItem({ productId: 2 }),
            generateProductItem({ productId: 3 }),
            generateProductItem({ productId: 4 }),
            generateProductItem({ productId: 5 }),
            generateProductItem({ productId: 6 }),
            generateProductItem({ productId: 7 }),
            generateProductItem({ productId: 8 }),
            generateProductItem({ productId: 9 }),
            generateProductItem({ productId: 10 }),
            generateProductItem({ productId: 11 }),
            generateProductItem({ productId: 12 }),
            generateProductItem({ productId: 13 }),
            generateProductItem({ productId: 14 }),
            generateProductItem({ productId: 15 }),
            generateProductItem({ productId: 16 }),
            generateProductItem({ productId: 17 }),
        ],
    });

    await prisma.cart.createMany({
        data: [
            {
                userId: 1,
                totalAmount: 0,
                token: '11111',
            },
            {
                userId: 2,
                totalAmount: 0,
                token: '222222',
            },
        ],
    });

    await prisma.cartItem.create({
        data: {
            productItemId: 1,
            cartId: 1,
            quantity: 2,
            ingredients: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });
}

async function clear() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await clear();
        await create();
    } catch (e) {
        console.log(e);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
