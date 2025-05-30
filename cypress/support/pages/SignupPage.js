import { SIGNUP_LOCATORS } from '../locators/signupLocators';

class SignupPage {
    visit() {
        cy.visit('https://front.serverest.dev/cadastrarusuarios');
    }

    fillName(name) {
        const field = cy.get(SIGNUP_LOCATORS.nameInput);
        name === '' ? field.clear() : field.type(name);
    }

    fillEmail(email) {
        const field = cy.get(SIGNUP_LOCATORS.emailInput);
        email === '' ? field.clear() : field.type(email);
    }

    fillPassword(password) {
        const field = cy.get(SIGNUP_LOCATORS.passwordInput);
        password === '' ? field.clear() : field.type(password);
    }

    submit() {
        cy.get(SIGNUP_LOCATORS.submitButton).click();
    }

    assertSuccessMessage() {
        cy.contains(SIGNUP_LOCATORS.successMessage).should('be.visible');
    }

    assertErrorMessage(message) {
        cy.contains(message).should('be.visible');
    }

    assertEmailInvalid() {
        cy.get(SIGNUP_LOCATORS.emailInput)
            .then($el => expect($el[0].checkValidity()).to.be.false);
    }

    assertUrlIncludes(path) {
        cy.url().should('include', path);
    }

    checkAdminCheckbox() {
        cy.get(SIGNUP_LOCATORS.adminCheckbox).check();
    }

    uncheckAdminCheckbox() {
        cy.get(SIGNUP_LOCATORS.adminCheckbox).uncheck();
    }

    fillForm(name, email, password, isAdmin = false) {
        this.fillName(name);
        this.fillEmail(email);
        this.fillPassword(password);
        isAdmin ? this.checkAdminCheckbox() : this.uncheckAdminCheckbox();
        this.submit();
    }
}

export default new SignupPage();
