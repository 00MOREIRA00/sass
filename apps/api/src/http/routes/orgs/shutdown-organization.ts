import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { userSchema, organizationSchema, defineAbilityFor } from '@saas/auth'
import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '../_erros/bad-request-error'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import { UnauthorizedError } from '../_erros/unauthorized-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function shutdownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Shutdown organization details',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
     async (request, reply) => {
        const { slug } = request.params
        const userId = await request.getCurrentUserId()
        const { membership, organization } = await request.getUserMemberShip(slug)

        const authOrganization = organizationSchema.parse(organization)

        const ability = getUserPermissions(userId, membership.role)

        if (ability.cannot('update', authOrganization)) {
        throw new UnauthorizedError(
            `You're not allowed to update this organization.`,
        )
        }

        await prisma.organization.delete({
          where: {
            id: organization.id,
          }
        })

        return reply.status(204).send()
      },
    )
}