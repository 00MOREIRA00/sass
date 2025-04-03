

```
pnpm @fastify/swagger
```


Dentro do server.ts, nós cadastramos a documentação

```
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
```

* Instalamos a interface grafica

```
pnpm @fastify/swagger-ui
```

* Cadastramos no server.ts também

```
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})
```

* Podemos adicionar parametros ao model da url para deixar melhor documentada, como por exemplo:

```
schema: {
        summary: "Create a new account",
        tags: ["Auth"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
```

> Adicionamos o `summary` e o `tags` como uma ofrma de descrição e organização nessa ordem para a doc.