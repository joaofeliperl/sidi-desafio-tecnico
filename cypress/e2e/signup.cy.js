import { faker } from '@faker-js/faker';
import SignupPage from '../support/pages/SignupPage';

describe('User Signup Validation', () => {
    beforeEach(() => {
        SignupPage.visit();
    });

    it('Should successfully register with valid data', () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm(name, email, password);
        SignupPage.assertSuccessMessage();
    });

    it('Should show error when name is empty', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm('', email, password);
        SignupPage.assertErrorMessage('Nome é obrigatório');
    });

    it.skip('Should show error when name contains only spaces', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm('     ', email, password);
        SignupPage.assertUrlIncludes('/cadastrarusuarios');
    });

    it.skip('Should show error when name has invalid characters', () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        SignupPage.fillForm('@@@', email, password);
        SignupPage.assertUrlIncludes('/cadastrarusuarios');
    });

    it('Should show error when email is empty', () => {
        const name = faker.person.fullName();
        const password = faker.internet.password();

        SignupPage.fillForm(name, '', password);
        SignupPage.assertErrorMessage('Email é obrigatório');
    });

    it('Should show error when email is invalid', () => {
        const name = faker.person.fullName();
        const password = faker.internet.password();

        SignupPage.fillForm(name, 'invalidemail', password);
        SignupPage.assertEmailInvalid();
    });

    it('Should show error when password is empty', () => {
        const name = faker.person.fullName();
        const email = faker.internet.email();

        SignupPage.fillForm(name, email, '');
        SignupPage.assertErrorMessage('Password é obrigatório');
    });
});
