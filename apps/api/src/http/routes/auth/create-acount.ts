import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { emit } from "process";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
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

      const passwordHash = await hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });
      return reply.status(201).send();
    },
  );
}
