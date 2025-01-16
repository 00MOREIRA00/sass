# Conceitos

## Saas = Service as a Service

Um software que vai ser usado por uma empresa para resolver um problema. Podendo ter duas arquiteturas communs: Single Tenant ou Multi Tenant.

- Single Tenant: Uma unica instancia do software usada por uma empresa. Caso seja necessário, que outra empresa utilize esse software, se faz necessário a "copia/duplicação" da instancia do serviço. Com isso temos uma insfraestrutura unica por cliente.

- Multi Tenant: Aqui temos um software com uma unica instancia, porém utilziada por mais de uma empresa.

## Authorização

RBAC (Role-Based Access Control) e ABAC (Attribute-Based Access Control) são dois modelos de controle de acesso usados para gerenciar permissões e autorizações em sistemas de software.

### RBAC (Role-Based Access Control)

Role - Admin, Billing , Developer, Member

- Definição: Controle de acesso baseado em funções.

- Como funciona: As permissões são atribuídas a funções específicas, e os usuários são atribuídos a essas funções. Cada função tem um conjunto de permissões associadas.

- Exemplo: Uma função "Admin" pode ter permissões para editar e excluir projetos, enquanto uma função "Membro" pode ter permissões apenas para visualizar projetos.

- Vantagens: Simplicidade na gestão de permissões, fácil de entender e implementar.

- Desvantagens: Menos flexível, pois as permissões são fixas para cada função.

### ABAC (Attribute-Based Access Control)

- Definição: Controle de acesso baseado em atributos.

- Como funciona: As permissões são concedidas com base em atributos de usuários, recursos e ambiente. As políticas de acesso são definidas usando esses atributos.

- Exemplo: Um usuário com o atributo "departamento: TI" pode ter permissões para editar projetos, enquanto um usuário com o atributo "departamento: Marketing" pode ter permissões apenas para visualizar projetos.

- Vantagens: Maior flexibilidade, permite definir políticas de acesso mais granulares e dinâmicas.

- Desvantagens: Mais complexo de implementar e gerenciar.

#### Diferenças Principais

- Flexibilidade: ABAC é mais flexível que RBAC, pois permite definir políticas de acesso baseadas em múltiplos atributos.

- Complexidade: RBAC é mais simples de implementar e gerenciar, enquanto ABAC pode ser mais complexo devido à necessidade de definir e gerenciar múltiplos atributos e políticas.

- Escalabilidade: ABAC pode ser mais escalável em ambientes complexos onde as permissões precisam ser altamente dinâmicas e contextuais.

## Banco de Dados

Pensando pelo lado do Banco de Dados, devemos planejar bem a necessidade de darmos permissão para que usuários possam adicionar novos cargos ao serviço. O motivo de isso se uma questão de debate é que com essa possibilidade nosso Banco de Dados tem uma complexidade maior, pois se isso é uma informação que o usuário pode adicionar, atualizar ou excluir, faz-se necessário a inserção no BD para todas as empresas.

Quando temos essas regras amarradas no sistema, proporcionamos menos liberdade para problemas e inserções desnecessarias no Banco de Dados. Para essa tomada de decisão tudo dependende da aplicação, das empresas que farão uso, do nicho da empresa, da infraestrutura disponivel, dentre outras coisas. Mas apartar essa possibilidade do BD é uma boa possibilidade, de forma que quando ocorrer a necessidade da criação de algo novo, fara-se necessário um deploy.
