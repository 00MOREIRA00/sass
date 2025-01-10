# Package Auth

Esse Package sera criado para que possamos utiliza-lo tanto no frontend como no backend. Pois teremos as permissões de cada cargo setados dentro de um arquivo da aplicação.

> Criamos um pacote pois tudo compartilhado entre mais de um projeto vira um pacote.

1. Dentro da pasta de `packages` nós criamos nosso arquivo de `package.json`.

```
{
    "name": "@saas/auth",
    "version": "0.0.1",
    "main": "index.js",
    "types": "src/index.ts",
    "devDependencies": {
        "@saas/prettier": "workspace:*",
        "@saas/eslint-config": "workspace:*",
        "@saas/typescript-config": "workspace:*"
    },
    "eslintConfig": {
        "extends": ["@saas/eslint-config/library.js"]
    },
    "prettier": "@saas/prettier"
}
```

Que recebe informações normais de projeto, importações e configurações do eslint e prettier. A unica coisa que temos de diferente é esse `type` que recebe o caminho do arquivo de typescript que será criado.

2. Configuramos nosso typescript no pasta de ts-config/library.

```
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "3.0.0",

  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

Que recebe as configurações usadas para compilar o typescript para o javascript.

3. Dentro da pasta `auth` criamos o arquivo de tsconfig.json

```
{
    "extends": "@saas/typescript-config/library.json",
    "include": ["src/**/*"]
}
```

E com isso informamos que o ts que será usado nesse package usara a config que está no arquivo library e os arquivos ts estarão dentro da pasta src.
