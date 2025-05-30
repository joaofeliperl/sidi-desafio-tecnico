import { LOGIN_LOCATORS } from '../locators/loginLocators';

class LoginPage {
    visit() {
        cy.visit('https://front.serverest.dev/login');
    }

    fillEmail(email) {
        const field = cy.get(LOGIN_LOCATORS.emailInput);
        email === '' ? field.clear() : field.type(email);
    }

    fillPassword(password) {
        const field = cy.get(LOGIN_LOCATORS.passwordInput);
        password === '' ? field.clear() : field.type(password);
    }

    submit() {
        cy.get(LOGIN_LOCATORS.submitButton).click();
    }

    login(email, password) {
        this.fillEmail(email);
        this.fillPassword(password);
        this.submit();
    }

    assertIsEmployee() {
        cy.url().should('include', '/home');
        cy.get('h4').should('contain.text', 'Produtos');
    }

    assertIsAdmin() {
        cy.url().should('include', '/admin/home');
        cy.get('p.lead').should('contain.text', 'administrar seu ecommerce');
    }
}

export default new LoginPage();
