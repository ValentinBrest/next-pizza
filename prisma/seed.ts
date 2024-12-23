import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

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
}

async function clear() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
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
