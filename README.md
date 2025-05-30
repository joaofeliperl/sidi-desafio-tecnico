# Desafio Técnico - QA

## Bugs Encontrados

### 1. Campo Nome

* O campo "Nome" está aceitando caracteres inválidos, como nomes compostos apenas por espaços em branco.

### 2. Inconsistência de Moeda

* O sistema exibe preços em dólar em determinadas telas e em reais em outras, o que gera confusão ao usuário.

### 3. Remoção de Itens do Carrinho

* Não é possível remover apenas um item específico do carrinho. A funcionalidade de remoção parece afetar o carrinho como um todo.

### 4. Alinhamento de Produtos

* Os produtos exibidos na tela estão com problemas de alinhamento, prejudicando a visualização adequada.

### 5. Componente de Carregamento

* O componente de loading aparece desalinhado em relação ao restante da interface.

### 6. Filtro de Pesquisa

* Após utilizar o filtro de busca e clicar em "Limpar filtro", a lista de produtos não é atualizada corretamente para exibir todos os produtos novamente.

### 7. Visibilidade de Produtos

* Produtos cadastrados via painel de administrador não aparecem corretamente para usuários comuns.

### 8. Validação de Preço no Formulário do Admin

* O formulário de cadastro de produto na tela de administrador aceita apenas valores inteiros no campo de preço, desconsiderando valores com casas decimais (float).

---

## Como Executar o Projeto

### Pré-requisitos

* Node.js instalado (versão recomendada: 18+)
* NPM ou Yarn instalado

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
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


