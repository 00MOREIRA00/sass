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

* Criamos um arquivo .env para receber as informações para autenticação com o BD. Nele inserimos o token de autenticação

* Criamos os Models (tabelas que serão usadas) do projeto.

* Podemos criar relações entre uma tabela e outra, igual fizemos entre a tabela User e Token.

```
    user User @relation(fields: [userId], references: [id])

    tokens Token[]
```

> Temos que adicionar a relação em ambas as tabelas, se não da erro

* Rodamos o comando para migrar o banco de dados 

```
pnpm prisma migrate dev
```

> Damos o nome para ele e sucesso