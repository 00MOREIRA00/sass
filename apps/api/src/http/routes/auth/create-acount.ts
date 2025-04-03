import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { emit } from "process";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { create } from "domain";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        summary: "Create a new account",
        tags: ["Auth"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (resquest, reply) => {
      const { name, email, password } = resquest.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        return reply.status(400).send({
          message: "User with same e-mail already exists!",
        });
      }

      // VERIFICA SE TEM EMAIL DE ORGANIZAÇÃO
      const [, domain] = email.split("@");
      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain,
          shouldAttachUsersByDomain: true
        },
      })


      const passwordHash = await hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          member_on: autoJoinOrganization ? {
            create: {
              organizationId: autoJoinOrganization.id,
            },
          } : undefined,
        },
      });
      return reply.status(201).send();
    },
  );
}
