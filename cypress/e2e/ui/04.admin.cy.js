import LoginPage from '../../support/pages/LoginPage';
import ProductPage from '../../support/pages/ProductPage';
import { faker } from '@faker-js/faker';

describe('Product Visibility Between Admin and Employee', () => {
    const productName = faker.commerce.productName();
    const productPrice = faker.commerce.price(100, 500);
    const productDescription = faker.commerce.productDescription();
    const productQuantity = faker.number.int({ min: 1, max: 10 });

    it('Admin registers a product and saves its data', () => {
        cy.readFile('cypress/fixtures/tempAdmin.json').then(({ email, password }) => {
            LoginPage.visit();
            LoginPage.login(email, password);
            LoginPage.assertIsAdmin();

            ProductPage.goToForm();
            ProductPage.fillName(productName);
            ProductPage.fillPrice(productPrice);
            ProductPage.fillDescription(productDescription);
            ProductPage.fillQuantity(productQuantity);
            ProductPage.submit();

            cy.writeFile('cypress/fixtures/tempProduct.json', {
                name: productName,
                price: productPrice
            });
        });
    });

    it.skip('Employee logs in and sees the registered product', () => {
        cy.readFile('cypress/fixtures/tempUser.json').then(({ email, password }) => {
            LoginPage.visit();
            LoginPage.login(email, password);
            LoginPage.assertIsEmployee();

            cy.readFile('cypress/fixtures/tempProduct.json').then(({ name, price }) => {
                ProductPage.searchProduct(name);
                ProductPage.assertProductCard(name, price);
            });
        });
    });
});
