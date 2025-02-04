import fastifyCors from "@fastify/cors";
import { fastify } from "fastify";
import {
    // jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from "./routes/auth/create-acount";




const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)


app.register(fastifyCors)

app.register(createAccount)




app.listen({ port: 9999 }).then(() => {
    console.log("Server is running on port 9999");
});