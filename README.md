# Desafio Técnico - QA

## Como Executar o Projeto

### Pré-requisitos

* Node.js instalado (versão recomendada: 18+)
* NPM ou Yarn instalado

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/joaofeliperl/sidi-desafio-tecnico.git
   cd sidi-desafio-tecnico
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

   ou

   ```bash
   yarn install
   ```

3. Instale a biblioteca Faker:

   ```bash
   npm install @faker-js/faker --save-dev
   ```

### Execução dos Testes

Para rodar os testes automatizados usando Cypress:

```bash
npx cypress open
```

ou

```bash
npx cypress run
```

---

## Estrutura de Diretórios

* `cypress/e2e/` - Contém os testes automatizados.
* `cypress/fixtures/` - Armazena arquivos temporários com dados utilizados nos testes.
* `cypress/support/pages/` - Contém os Page Objects utilizados para abstração das interações com a UI.
* `cypress/support/locators/` - Define os seletores utilizados nos testes para facilitar a manutenção.

---

## Bugs Encontrados

### Bugs de Frontend

#### 1. Validação inadequada no campo Nome

**Descrição:** O campo "Nome" permite o cadastro de usuários preenchendo apenas com espaços em branco, o que não deveria ser aceito.
**Passos para reprodução:**

1. Acesse a tela de cadastro de usuário.
2. Insira somente espaços no campo "Nome".
3. Preencha os demais campos normalmente e clique em "Cadastrar".
4. Resultado: O cadastro é realizado com sucesso, embora o campo não esteja corretamente preenchido.

#### 2. Inconsistência na apresentação das moedas

**Descrição:** Há divergência na exibição dos valores monetários entre diferentes telas do sistema, alternando entre dólar e real.
**Passos para reprodução:**

1. Cadastre um produto pelo painel administrativo.
2. Visualize o produto tanto como administrador quanto como usuário comum.
3. Resultado: O mesmo produto pode ser exibido ora em reais, ora em dólares, causando inconsistência na interface.

#### 3. Restrição na remoção de itens do carrinho

**Descrição:** O sistema não permite a exclusão individual de itens do carrinho de compras; a remoção afeta múltiplos itens ou o carrinho inteiro.
**Passos para reprodução:**

1. Adicione múltiplos produtos ao carrinho.
2. Tente remover apenas um deles.
3. Resultado: O sistema remove todos os itens ou não executa a ação esperada.

#### 4. Problemas de alinhamento em produtos e componente de carregamento

**Descrição:** Os produtos listados e o componente de loading apresentam desalinhamento visual, prejudicando a experiência do usuário.
**Passos para reprodução:**

1. Acesse a listagem de produtos.
2. Observe o posicionamento dos cards e do indicador de carregamento.
3. Resultado: Há desalinhamento perceptível entre os elementos da interface.

#### 5. Filtro de pesquisa não restaura o estado inicial da listagem

**Descrição:** Após aplicar um filtro de pesquisa e acionar "Limpar filtro", a listagem de produtos não retorna ao estado original, exibindo apenas os resultados filtrados previamente.
**Passos para reprodução:**

1. Realize uma pesquisa por nome de produto.
2. Clique em "Limpar filtro".
3. Resultado: A lista permanece filtrada, sem restaurar todos os produtos.

#### 6. Produtos cadastrados pelo administrador não aparecem para usuários comuns

**Descrição:** Produtos criados via painel administrativo não ficam disponíveis para visualização pelos usuários não administradores.
**Passos para reprodução:**

1. Realize login como administrador e cadastre um novo produto.
2. Saia e acesse como usuário comum.
3. Busque pelo produto cadastrado.
4. Resultado: O produto não é exibido na listagem do usuário.

#### 7. Restrição indevida no campo de preço do produto

**Descrição:** O campo de preço do produto aceita apenas valores inteiros, rejeitando valores decimais, o que limita a correta representação de preços.
**Passos para reprodução:**

1. No cadastro de produto, tente inserir um valor decimal no campo preço (ex: 19.90).
2. Resultado: O sistema exibe mensagem de erro e não permite o cadastro.

---

### Bugs Encontrados nos Testes de API

#### 8. Inconsistência no tratamento de IDs inválidos ou inexistentes

**Descrição:** A API apresenta comportamentos distintos ao receber requisições com IDs inválidos ou inexistentes, alternando entre erro de formato, mensagem de entidade não encontrada ou resposta 200 com array vazio.
**Passos para reprodução:**

1. Realize requisições GET, PUT ou DELETE em endpoints como `/produtos/{id}` ou `/usuarios/{id}` utilizando IDs inválidos ou inexistentes.
2. Resultado: A resposta pode variar entre erro de formato, mensagem "Nenhum registro excluído", ou ainda uma lista vazia, dificultando a padronização dos testes automatizados.

#### 9. Filtro por ID de produto retorna todos os produtos em caso de inexistência

**Descrição:** Ao realizar busca por um produto inexistente utilizando o parâmetro `_id`, a API retorna a lista completa de produtos em vez de um array vazio, contrariando o esperado.
**Passos para reprodução:**

1. Execute uma requisição `GET /produtos?_id=ID_INEXISTENTE`.
2. Resultado: A API ignora o filtro e retorna todos os produtos disponíveis.

#### 10. Ordem inadequada nas validações de atualização de entidades

**Descrição:** Em operações de atualização (PUT), a API pode priorizar a validação de e-mail duplicado antes da verificação da existência do ID, retornando mensagem de erro inadequada em relação ao contexto da requisição.
**Passos para reprodução:**

1. Tente atualizar um usuário ou produto com um ID inexistente e um e-mail já cadastrado.
2. Resultado: A resposta da API será "Este email já está sendo usado" em vez de "Entidade não encontrada".

---


