import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed(){
    await prisma.organization.deleteMany()
    await prisma.user.deleteMany()

    const passwordHash = await hash('123456', 10)

    // CRIANDO PRIMEIRO USUÁRIO
    const user = await prisma.user.create({
        data: {
            name: "Robert Netson",
            email: "robert@gmail.com",
            avatarUrl: "https://github.com/00MOREIRA00.png",
            passwordHash,
        },
    })

    // CRIANDO SEGUNDO USUÁRIO
    const anotherUser = await prisma.user.create({
        data: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            passwordHash,
        }
    })

    // CRIANDO TERCEIRO USUÁRIO
    const anotherUser2 = await prisma.user.create({
        data: {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            avatarUrl: faker.image.avatar(),
            passwordHash,
        }
    })

    // CRIANDO A ORGANIZAÇÃO
    await prisma.organization.create({
        data: {
            name: "Acme Inc (Admin)",
            domain: "acme.com",
            slug: "acme-admin",
            avatarUrl: faker.image.avatarGitHub(),
            shouldAttachUsersByDomain: true,
            ownerId: user.id,
            projects:{
                createMany: {
                    data: [
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        },
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        },
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        }
                    ],
                }
            },
            members: {
                createMany: {
                    data: [
                        {
                            userId: user.id,
                            role: "ADMIN",
                        },
                        {
                            userId: anotherUser.id,
                            role: "MEMBER",
                        },
                        {
                            userId: anotherUser2.id,
                            role: "MEMBER",
                        },
                    ]
                }
            }
        }
    })
        
    // CRIANDO OUTRA ORGANIZAÇÃO
    await prisma.organization.create({
        data: {
            name: "Acme Inc (Member)",
            slug: "acme-member",
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: user.id,
            projects:{
                createMany: {
                    data: [
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        },
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        },
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        }
                    ],
                }
            },
            members: {
                createMany: {
                    data: [
                        {
                            userId: user.id,
                            role: "MEMBER",
                        },
                        {
                            userId: anotherUser.id,
                            role: "ADMIN",
                        },
                        {
                            userId: anotherUser2.id,
                            role: "MEMBER",
                        },
                    ]
                }
            }
        }
    })
    
    // CRIANDO MAIS UMA ORGANIZAÇÃO
    await prisma.organization.create({
        data: {
            name: "Acme Inc (Billing)",
            slug: "acme-billing",
            avatarUrl: faker.image.avatarGitHub(),
            ownerId: user.id,
            projects:{
                createMany: {
                    data: [
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        },
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        },
                        {
                            name: faker.lorem.words(5),
                            slug: faker.lorem.slug(5),
                            description: faker.lorem.paragraph(),
                            avatarUrl: faker.image.avatarGitHub(),
                            ownerId: faker.helpers.arrayElement([user.id, anotherUser.id, anotherUser2.id]),
                        }
                    ],
                }
            },
            members: {
                createMany: {
                    data: [
                        {
                            userId: user.id,
                            role: "BILLING",
                        },
                        {
                            userId: anotherUser.id,
                            role: "ADMIN",
                        },
                        {
                            userId: anotherUser2.id,
                            role: "MEMBER",
                        },
                    ]
                }
            }
        }
    })
}


seed().then(() => {
    console.log("Seeding finished.")
    })
