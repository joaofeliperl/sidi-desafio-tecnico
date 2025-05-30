import { faker } from '@faker-js/faker';
import LoginPage from '../support/pages/LoginPage';
import ProductPage from '../support/pages/ProductPage';

describe('Admin Product Form Validation', () => {
    beforeEach(() => {
        cy.readFile('cypress/fixtures/tempAdmin.json').then(({ email, password }) => {
            LoginPage.visit();
            LoginPage.login(email, password);
            LoginPage.assertIsAdmin();
            ProductPage.goToForm();
        });
    });

    it('Displays error when name field is empty', () => {
        ProductPage.fillName('');
        ProductPage.fillPrice('100');
        ProductPage.fillDescription('Descrição válida');
        ProductPage.fillQuantity('2');
        ProductPage.submit();
        ProductPage.assertErrorMessageVisible();
    });

    it('Displays error when price field is empty', () => {
        ProductPage.fillName('Produto Teste');
        ProductPage.fillPrice('');
        ProductPage.fillDescription('Descrição válida');
        ProductPage.fillQuantity('2');
        ProductPage.submit();
        ProductPage.assertErrorMessageVisible();
    });

    it('Displays error when quantity is negative', () => {
        ProductPage.fillName('Produto Teste');
        ProductPage.fillPrice('100');
        ProductPage.fillDescription('Descrição válida');
        ProductPage.fillQuantity('-5');
        ProductPage.submit();
        ProductPage.assertErrorMessageVisible();
    });

    it('Displays error when all fields are empty', () => {
        ProductPage.fillName('');
        ProductPage.fillPrice('');
        ProductPage.fillDescription('');
        ProductPage.fillQuantity('');
        ProductPage.submit();
        ProductPage.assertErrorMessageVisible();
    });

    it('Successfully submits the product form with valid integer price', () => {
        const name = faker.commerce.productName();
        const price = faker.number.int({ min: 50, max: 500 }).toString();
        const description = faker.commerce.productDescription();
        const quantity = faker.number.int({ min: 1, max: 10 }).toString();

        ProductPage.fillName(name);
        ProductPage.fillPrice(price);
        ProductPage.fillDescription(description);
        ProductPage.fillQuantity(quantity);
        ProductPage.submit();

        cy.get('table tbody tr').should('contain.text', name);
    });

    it('Fails to submit when price has decimal value (HTML5 validation)', () => {
        const name = faker.commerce.productName();
        const price = '199.99';
        const description = faker.commerce.productDescription();
        const quantity = faker.number.int({ min: 1, max: 10 }).toString();

        ProductPage.fillName(name);
        ProductPage.fillPrice(price);
        ProductPage.fillDescription(description);
        ProductPage.fillQuantity(quantity);

        cy.get('[data-testid="preco"]').then($el => {
            expect($el[0].checkValidity()).to.be.false;
            expect($el[0].validationMessage).to.contain('valid value');
        });
    });
});
