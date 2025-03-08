# Iniciando API

```
fastify
fastify-type-provider-zod
@fastify/cors
zod
```

> Serializar é tranformação dos dados de entrada e saída

---

1. Importação de pacotes

```
import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from "./routes/auth/create-acount";
```

- fastifyCors: Middleware para habilitar CORS (Cross-Origin Resource Sharing), permitindo requisições de diferentes origens.

- fastify: Função para criar uma instância do Fastify.

- fastify-type-provider-zod: Plugin que permite usar o Zod para validação de schemas no Fastify.

- createAccount: Um módulo que provavelmente contém uma rota para criar contas de usuário.

2. Criação da instância do servidor

```
const app = fastify().withTypeProvider<ZodTypeProvider>()
```

- fastify(): Cria uma nova instância do servidor Fastify.

- .withTypeProvider<ZodTypeProvider>(): Habilita suporte a tipos do Zod para validação de

3. Configuração de serialização e validação

```
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
```

- setSerializerCompiler(serializerCompiler): Define um compilador para serializar as respostas da API.

- setValidatorCompiler(validatorCompiler): Define um compilador para validar os dados de entrada das requisições.

4. Registro de plugins e rotas

```
app.register(fastifyCors)
app.register(createAccount)
```

- register(fastifyCors): Habilita o middleware de CORS no servidor.
- register(createAccount): Registra a rota de criação de conta.

5. Inicialização do servidor

```
app.listen({ port: 9999 }).then(() => {
    console.log("Server is running on port 9999");
});
```

- Inicia o servidor Fastify na porta 9999.
- Quando o servidor estiver pronto, exibe a mensagem "Server is running on port 9999" no console.
