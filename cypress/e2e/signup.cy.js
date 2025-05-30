import { faker } from '@faker-js/faker';
import SignupPage from '../support/pages/SignupPage';

describe('User Signup Validation', () => {
    beforeEach(() => {
        SignupPage.visit();
    });

    it('Registers a non-admin user and saves credentials to file', () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm(name, email, password, false);
        SignupPage.assertSuccessMessage();

        cy.writeFile('cypress/fixtures/tempUser.json', {
            email,
            password,
            isAdmin: false
        });
    });

    it('Registers an admin user and saves credentials to file', () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm(name, email, password, true);
        SignupPage.assertSuccessMessage();

        cy.writeFile('cypress/fixtures/tempAdmin.json', {
            email,
            password,
            isAdmin: true
        });
    });

    it('Displays error when name field is empty', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm('', email, password);
        SignupPage.assertErrorMessage('Nome é obrigatório');
    });

    it.skip('Rejects user registration when name contains only spaces', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm('     ', email, password);
        SignupPage.assertUrlIncludes('/cadastrarusuarios');
    });

    it.skip('Rejects user registration when name contains invalid characters', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm('@@@', email, password);
        SignupPage.assertUrlIncludes('/cadastrarusuarios');
    });

    it('Displays error when email field is empty', () => {
        const name = faker.person.fullName();
        const password = faker.internet.password();

        SignupPage.fillForm(name, '', password);
        SignupPage.assertErrorMessage('Email é obrigatório');
    });

    it('Displays error when email is in invalid format', () => {
        const name = faker.person.fullName();
        const password = faker.internet.password();

        SignupPage.fillForm(name, 'invalidemail', password);
        SignupPage.assertEmailInvalid();
    });

    it('Displays error when password field is empty', () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();

        SignupPage.fillForm(name, email, '');
        SignupPage.assertErrorMessage('Password é obrigatório');
    });
});
