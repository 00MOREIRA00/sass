import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { Role } from "@prisma/client"

import { auth } from "@/http/middlewares/auth";
import { roleSchema } from "@saas/auth";
import { memoryUsage } from "process";

export async function getMemberShip(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .register(auth)
        .get(
            '/organization/:slug/membership',
            {
                schema: {
                    tags: ['Organizations'],
                    summary: 'Get the membership of the user in the organization',
                    security: [{ bearerAuth: [] }],
                    params: z.object({
                        slug: z.string(),
                    }),
                    response: {
                        200 : z.object({
                            membership: z.object({
                                id: z.string().uuid(),
                                role: roleSchema,
                                organizationId: z.string().uuid(),
                            })
                        })
                    }
                },
            },
            async (request) => {
                const { slug } = request.params;
                const { membership } = await request.getUserMemberShip(slug);

                return { membership: {
                    id: membership.id,
                    role: roleSchema.parse(membership.role),
                    organizationId: membership.organizationId
                } };
            }
        );
}