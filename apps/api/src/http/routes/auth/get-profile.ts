import { FastifyInstance } from "fastify";
import { z } from "zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "@/lib/prisma";
import { emitWarning } from "process";
import { BadRequestError } from "../_erros/bad-request-error";
import { auth } from "@/http/middlewares/auth";

export async function getProfile(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().register(auth).get('/profile', {
            schema: {
                tags: ['Auth'],
                description: 'Verification if user is authenticated in the system',
                summary: 'Get authenticated user profile',
                response: {
                    200: z.object({
                        user: z.object({
                            id: z.string().uuid(),
                            name: z.string().nullable(),
                            email: z.string().email(),
                            avatarUrl: z.string().url().nullable(),
                        })
                    })
                },
            },     
        },
        async (request, reply) => {
            const userId = await request.getCurrentUserId();

            const user = await prisma.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                },
                where: {
                    id: userId,
                },
            });

            if (!user) {
                throw new BadRequestError('User not found');
            }

            return reply.status(200).send({ user });
        },
    );
}