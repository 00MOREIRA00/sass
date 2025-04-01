import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed(){
    await prisma.organization.deleteMany()
    await prisma.user.deleteMany()

    const passwordHash = await hash('123456', 10)

    const [user, anotherUser, anotherUser2] = await prisma.user.createMany({
        data:[ {
            name: "Robert Netson",
            email: "robert@gmail.com",
            avatarUrl: "https://github.com/00MOREIRA00.png",
            passwordHash,
        },
        {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            passwordHash,
        },
        {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            passwordHash,
    },
    ],
    })

    await prisma.organization.create({
        



    


seed().then(() => {
    console.log("Seeding finished.");
})
