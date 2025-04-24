import { FastifyInstance } from 'fastify';
import { compare } from 'bcrypt';
import { z } from "zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "@/lib/prisma";
import fastifyJwt from '@fastify/jwt';
import { BadRequestError } from '../_erros/bad-request-error';

export async function authenticateWithProviderPassword(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/sessions/password', {
        schema: {
            tags: ['Auth'],
            summary: 'Authenticate with password',
            description: 'Authenticate user with email and password to utilize the system',
            body: z.object({
                email: z.string().email(),
                password: z.string().min(6),
            }),
            response: {
                201: z.object({
                    token: z.string(),
                })
            },
        },     
    },
    async (request, reply) => {
        const { email, password } = request.body;
        
        const userFromEmail = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (!userFromEmail) {
            throw new BadRequestError('Invalid credentials');
        }

        if (userFromEmail.passwordHash == null) {
            throw new BadRequestError('User does not have a password, use social login.');
        }

        const isPasswordCorrect = await compare(password, userFromEmail.passwordHash);

        if (!isPasswordCorrect) {
            throw new BadRequestError('Invalid credentials');
        }

        const token = await reply.jwtSign({
            sub: userFromEmail.id,
        }, {
            sign: {
                expiresIn: '7d',
            }
        })

        return reply.status(201).send({ token })

    },

)
}