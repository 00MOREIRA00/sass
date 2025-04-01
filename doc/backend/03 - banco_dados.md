```
pnpm install prisma -D
```

```
docker-compose up -d

docker logs <<id>> -t
```

- Prisma é um ORM

docker-compose up -d

docker logs <<id>> -t

---

# Configurando o Prisma

```
    pnpm prisma init
```

- Criamos um arquivo .env para receber as informações para autenticação com o BD. Nele inserimos o token de autenticação

- Criamos os Models (tabelas que serão usadas) do projeto.

- Podemos criar relações entre uma tabela e outra, igual fizemos entre a tabela User e Token.

```
    user User @relation(fields: [userId], references: [id])

    tokens Token[]
```

> Temos que adicionar a relação em ambas as tabelas, se não da erro

- Rodamos o comando para migrar o banco de dados

```
pnpm prisma migrate dev
```

> Damos o nome para ele e sucesso

- Abrindo interface grafica do banco de dados

```
pnpm prisma studio
```

- Criamos um seed para popular esse banco de dados, visando fazer testes no futuro.

> Um seed de banco de dados é um processo usado para popular o banco de dados com dados iniciais ou de exemplo. Esses dados podem ser usados para testes, desenvolvimento ou para configurar valores padrão necessários para o funcionamento da aplicação.

- Populando o Seed

```
pnpm install --save-dev @faker-js/faker -D
```
