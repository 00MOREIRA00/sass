


## Features 

### Authentication 

- [] Devera ser capaz de autenticar usando email e senha
- [] Devera ser capaz de autenticar usando o Github
- [] Devera ser capaz de recuperar senha usando o email
- [] Devera ser capaz de criar uma conta (usando email e senha)

### Organizations 

- [] Devera ser capaz de criar uma nova organização
- [] Devera ser capaz de obter uma organização e selecionar a que usuário pertence 
- [] Devera ser capaz de atualizar a organização
- [] Devera ser capaz de desablizar uma organização 
- [] Devera ser capaz de trrnaferir o responsavel pela organização

### Convites 

- [] Devera ser capaz de convidar um novo membro (email, role)
- [] Devera ser capaz de aceitar convite 
- [] Devera ser capaz de revogar convites pendentes 

### Membros

- [] Devera ser capaz de obter informações de membros de organizações
- [] Devera ser capaz de atualizar regra do usuário

### Projeto

- [] Devera ser capaz de obter projetos dentro de organizações
- [] Devera ser capaz de criar um novo projeto (nome, url, descrição)
- [] Devera ser capaz de atualizar um projeto (nome, url, descrição)
- [] Devera ser capaz de deletar um projeto

### Billing 

- [] Devera ser capaz de obter os dados de billing da organização


### Regras

- Billing 
- Membro 
- Admin


### Tabela de Permissões
|                          | Administrador | Membro | Financeiro | Anonimo |
| ------------------------ | ------------- | ------ | ------- | --------- |
| Atualziar Organização    | ✅            | ❌     | ❌      | ❌        |
| Deletar Organização      | ✅            | ❌     | ❌      | ❌        |
| Convidar um Membro       | ✅            | ❌     | ❌      | ❌        |
| Revogar Convite          | ✅            | ❌     | ❌      | ❌        |
| Listar Membros           | ✅            | ✅     | ✅      | ❌        |
| Tranferir Dono Projeto   | ⚠️            | ❌     | ❌      | ❌        |
| Atualizar regras membro  | ✅            | ❌     | ❌      | ❌        |
| Deletar Membro           | ✅            | ⚠️     | ❌      | ❌        |
| Listar Projetos          | ✅            | ✅     | ✅      | ❌        |
| Criar novo Projeto       | ✅            | ✅     | ❌      | ❌        |
| Atualizar projeto        | ✅            | ⚠️     | ❌      | ❌        |
| Deletar projeto          | ✅            | ⚠️     | ❌      | ❌        |
| Obter info Financeiro    | ✅            | ❌     | ✅      | ❌        |
| Exportar info Financeiro | ✅            | ❌     | ✅      | ❌        |

> ✅ = Permitido 
> ❌ = Não Permitido 
> ⚠️ = Permitido c/ condição

#### Condições 
- Somente os proprietários podem transferir a propriedade da organização; 
- Somente administradores e autores de projetos podem atualizar/excluir o projeto;
- Membros podem deixar sua própria organização;