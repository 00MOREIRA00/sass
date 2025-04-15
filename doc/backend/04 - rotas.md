# Rotas

## Rota de Criação de Conta

#### Dependências

```
pnpm install bcryptjs
pnpm install @types/bcryptjs -D
```

#### Associado de organização automatica

Essa rota tem uma funcionalidade especifica, pois durante a riação ela verifica o dominio do email e procura por esse dominio para ver se essa organização possui a opção de inserção automatica no cadastro, caso tenha ele já é adicionado a organização.

**Como isso é feito?** nós durante o cadastro pegamos o email e fazemos um trtamento pegando somente o dominio. Com o dominio em mãos, nós fazemos uma busca pelo dominio e se a empresa tem o `shouldAttachUsersByDomain` habilitado.

```
// VERIFICA SE TEM EMAIL DE ORGANIZAÇÃO
      const [, domain] = email.split("@");
      const autoJoinOrganization = await prisma.organization.findFirst({
        where: {
          domain,
          shouldAttachUsersByDomain: true
        },
      })
```

Caso ele esteja habilitado, no processo da criação no banco nós fazemos uma condicional: 

```
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
```

> Caso ele esteja dentro das condições do `autoJoinOrganization` será inserido passando o parametro que a tabela espera receber, caso conteria fica como undefined.

## Rota de autenticação com Senha

### Dependências

```
pnpm install @fastify jwt
```

### Fluxo 

1. Valida campos passados pelo usuário
2. Recupera campos passados pelo usuário
3. Pesquisa usuário no banco de dados através do email
4. Verifica se encontra email no banco 
5. Verifica se existe senha cadastrada no campo de senha (Se não existir, é porque ele se loga pelo github)
6. Caso encontre o email, verifica a senha se está igual no banco
7. Gera token e retorna

### Desenvolvimento

* Registramos ele no arquivo de server.
* Cadastra rota, dentre outras coisas como o provider Zod
* Recuperamos os dados passados na chamada da api
* Com os dados passados em mão, nós criamos uma validação do email e senha passado
* Estando tudo ok com as credênciais passadas, nós retornamos um token jwt com a informação de id do usuário ccontida nele.


