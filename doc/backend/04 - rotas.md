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