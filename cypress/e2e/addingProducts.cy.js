import LoginPage from '../support/pages/LoginPage';

describe('Login Page Tests', () => {
    beforeEach(() => {
        LoginPage.visit();
            cy.readFile('cypress/fixtures/tempUser.json').then(({ email, password }) => {
            LoginPage.login(email, password);
            LoginPage.assertIsEmployee();
        });
    });

    it('Adding products to the list', () => {
        cy.get('[data-testid="adicionarNaLista"]').eq(0).click();

        cy.url().should('include', '/minhaListaDeProdutos');

        cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible');
    })

    it('Increasing quantity of the product', () => {
      cy.get('[data-testid="adicionarNaLista"]').eq(0).click();

      Cypress._.times(9, () => {
    cy.get('[data-testid="product-increase-quantity"]').eq(0).click();
    });

    cy.url().should('include', '/minhaListaDeProdutos');

    cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible');

});

    it('Adding more than one product to the list', () => {
        cy.get('[data-testid="adicionarNaLista"]').eq(0).click();

        cy.get('[data-testid="paginaInicial"]').eq(0).click(); 

        cy.get('[data-testid="adicionarNaLista"]').eq(1).click();

        cy.get('[data-testid="paginaInicial"]').eq(0).click(); 

        cy.get('[data-testid="adicionarNaLista"]').eq(2).click();

        Cypress._.times(9, () => {

        cy.get('[data-testid="product-increase-quantity"]').eq(2).click();
       });

        cy.url().should('include', '/minhaListaDeProdutos');

        cy.get('[data-testid="shopping-cart-product-name"]').should('be.visible');
    });

    it.skip('Removing products from the list', () => {
        cy.get('[data-testid="adicionarNaLista"]').eq(0).click();

        cy.get('[data-testid="product-decrease-quantity"]').eq(0).click();

    })

});