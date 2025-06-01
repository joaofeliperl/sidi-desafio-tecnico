import LoginPage from '../../support/pages/LoginPage';
import ProductListPage from '../../support/pages/ProductListPage';

describe('Login Page Tests', () => {
    beforeEach(() => {
        LoginPage.visit();
        cy.readFile('cypress/fixtures/tempUser.json').then(({ email, password }) => {
            LoginPage.login(email, password);
            LoginPage.assertIsEmployee();
        });
    });

    it('Adding products to the list', () => {
        ProductListPage.addProductToList(0);
        ProductListPage.assertRedirectToCart();
        ProductListPage.assertProductVisibleInCart();
    });

    it('Increasing quantity of the product', () => {
        ProductListPage.addProductToList(0);
        ProductListPage.increaseProductQuantity(0, 9);
        ProductListPage.assertRedirectToCart();
        ProductListPage.assertProductVisibleInCart();
    });

    it('Adding more than one product to the list', () => {
        ProductListPage.addProductToList(0);
        ProductListPage.goBackToHome();
        ProductListPage.addProductToList(1);
        ProductListPage.goBackToHome();
        ProductListPage.addProductToList(2);
        ProductListPage.increaseProductQuantity(2, 9);
        ProductListPage.assertRedirectToCart();
        ProductListPage.assertProductVisibleInCart();
    });

    it.skip('Removing products from the list', () => {
        ProductListPage.addProductToList(0);
        ProductListPage.decreaseProductQuantity(0, 1);
    });
});
