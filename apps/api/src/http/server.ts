import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { createAccount } from "./routes/auth/create-acount";
import fastifySwaggerUi from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);


app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js Saas',
      description: 'Fullstack Saas app with Mult-tenant & RBAC',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,

});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

app.register(fastifyCors);

app.register(createAccount);

app.listen({ port: 9999 }).then(() => {
  console.log("Server is running on port 9999");
});
