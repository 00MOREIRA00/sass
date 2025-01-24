# Zod

O Zod é uma biblioteca de TypeScript para validação e parsing de esquemas. Ele permite definir esquemas para objetos, arrays, strings, números, etc., e validar dados contra esses esquemas. É útil para garantir que os dados recebidos de fontes externas (como APIs) estejam no formato esperado e para fornecer mensagens de erro claras quando os dados não são válidos.

```
pnpm install zod
```

O que foi feito ?

Dentro do meu `./packages/auth/src/subjects` eu modifiquei as tipagens das regras para utilizar o zod, de forma que anteriormente está utilizando typascript puro.

```typescript
import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('delete'),
    z.literal('update'),
    z.literal('get'),
    z.literal('invite'),
    z.literal('manage'),
  ]),
  z.literal('User'),
])

export type ProjectUser = z.infer<typeof userSubject>

```


Foi criado um arquivo chamado roles, que irá fazer a importação dessas regras:

```typescript
import { z } from 'zod';

export const roleSchema = z.union([ 
    z.literal('ADMIN'),
    z.literal('MEMBER'),
    z.literal('BILLING')
])


export type Role = z.infer<typeof roleSchema>
```

Dentro do Models agora as regras serão pegas desse arquivo Roles 

```typescript
import { Role } from '../roles'

export type User = {
  role: Role
}
```

Dentro do arquivo de permissions eu importo esse arquivo roles.


Refatorando arquivo de models, para utilizar o zod também:

```
import { z } from 'zod'
import { roleSchema } from '../roles'

export const userSchema = z.object({
  role: roleSchema
})

export type User = z.infer<typeof userSchema>
```

> Aqui não posso passar Role o role, pois se trava de um código javascript, dessa forma não posso passar o typescript