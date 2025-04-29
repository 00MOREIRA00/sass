import { FastifyInstance } from "fastify";
import { z } from "zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "@/lib/prisma";
import { emitWarning } from "process";
import { BadRequestError } from "../_erros/bad-request-error";
import { auth } from "@/http/middlewares/auth";
import { UnauthorizedError } from "../_erros/unauthorized-error";
import { hash } from 'bcryptjs'

export async function resetPassword(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/password/reset', {
            schema: {
                tags: ['Auth'],
                description: 'Request reset password using a token',
                summary: 'Reset password',
                body: z.object({
                    code: z.string(),
                    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
                }),
                response: {
                    201: z.null(),
                },
            },     
        },
        async (request, reply) => {
            const {code, password} = request.body
            
            const tokenFromCode = await prisma.token.findUnique({
                where: {
                    id: code,
                },
            })

            if (!tokenFromCode) {
                throw new UnauthorizedError()
            }

            const passwordHash = await hash(password, 10)

            await prisma.user.update({
                where: {
                    id: tokenFromCode.userId,
                },
                data: {
                    passwordHash,
                },
            })

            return reply.status(201).send()
        },
    );
}