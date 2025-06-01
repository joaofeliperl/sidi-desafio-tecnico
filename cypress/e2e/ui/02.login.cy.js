import LoginPage from '../../support/pages/LoginPage';

describe('Login Page Tests', () => {
    beforeEach(() => {
        LoginPage.visit();
    });

    it('Logs in successfully as an employee and redirects to /home', () => {
        cy.readFile('cypress/fixtures/tempUser.json').then(({ email, password }) => {
            LoginPage.login(email, password);
            LoginPage.assertIsEmployee();
        });
    });

    it('Logs in successfully as an admin and redirects to /admin/home', () => {
        cy.readFile('cypress/fixtures/tempAdmin.json').then(({ email, password }) => {
            LoginPage.login(email, password);
            LoginPage.assertIsAdmin();
        });
    });

    it('Displays error when email field is empty', () => {
        LoginPage.fillEmail('');
        LoginPage.fillPassword('somepassword');
        LoginPage.submit();
        cy.url().should('include', '/login');
    });

    it('Displays error when password field is empty', () => {
        LoginPage.fillEmail('test@test.com');
        LoginPage.fillPassword('');
        LoginPage.submit();
        cy.url().should('include', '/login');
    });

    it('Rejects login with incorrect password', () => {
        cy.readFile('cypress/fixtures/tempUser.json').then(({ email }) => {
            LoginPage.login(email, 'wrongPassword');
            cy.url().should('include', '/login');
        });
    });

});
