# PNPM (Performant NPM)

O pnpm (Performant NPM) é um gerenciador de pacotes para JavaScript, assim como o npm e o yarn, mas com um foco maior em eficiência de armazenamento e desempenho.

**Principais vantagens do pnpm:**

1. Armazena pacotes de forma eficiente

   - Em vez de duplicar pacotes na pasta node_modules, o pnpm cria links simbólicos para um armazenamento global, economizando espaço em disco.

2. Melhor desempenho

   - Como os pacotes são compartilhados, a instalação é muito mais rápida em comparação com npm e yarn.

3. Menos problemas com node_modules

   - O pnpm mantém cada pacote isolado, evitando conflitos comuns que acontecem com npm e yarn.

4. Compatível com npm e yarn

   - Ele usa o mesmo package.json, então você pode alternar entre os gerenciadores sem grandes problemas.

---

Os workspaces no pnpm permitem gerenciar múltiplos pacotes dentro de um mesmo repositório (monorepo), facilitando o compartilhamento de dependências e a organização do projeto.
