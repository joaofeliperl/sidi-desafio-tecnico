import LoginPage from '../support/pages/LoginPage';
import ProductPage from '../support/pages/ProductPage';

describe('Product Search Functionality', () => {
    beforeEach(() => {
        cy.readFile('cypress/fixtures/tempUser.json').then(({ email, password }) => {
            LoginPage.visit();
            LoginPage.login(email, password);
            LoginPage.assertIsEmployee();
        });
    });

    it('Displays matching product when a valid name is searched', () => {
        const knownProduct = 'Refined Ceramic Chair';
        const knownPrice = '470';

        ProductPage.searchProduct(knownProduct);
        ProductPage.assertProductInCardView(knownProduct, knownPrice);
    });

    it('Displays not found message when searching for nonexistent product', () => {
        ProductPage.searchProduct('Refined Ceramic Chair Inexistente');
        ProductPage.assertProductNotFound();
    });
});
