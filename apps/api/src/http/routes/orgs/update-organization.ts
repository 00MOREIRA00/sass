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

export async function updateOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Update organization details',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().nullish(),
            shouldAttachUsersByDomain: z.boolean().optional(),
          }),
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
        const { membership, organization } =
          await request.getUserMemberShip(slug)

        const { name, domain, shouldAttachUsersByDomain } = request.body

        const authOrganization = organizationSchema.parse(organization)

        const ability = getUserPermissions(userId, membership.role)

        if (ability.cannot('update', authOrganization)) {
        throw new UnauthorizedError(
            `You're not allowed to update this organization.`,
        )
        }

        if (domain) {
          const organizationByDomain = await prisma.organization.findFirst({
            where: {
              domain,
              id: {
                not: organization.id,
              },
            },
          })

          if (organizationByDomain) {
            throw new BadRequestError(
              'Another organization with same domain already exists.',
            )
          }
        }

        await prisma.organization.update({
          where: {
            id: organization.id,
          },
          data: {
            name,
            domain,
            shouldAttachUsersByDomain,
          },
        })

        console.log({
  name,
  domain,
  shouldAttachUsersByDomain
})

        return reply.status(204).send()
      },
    )
}