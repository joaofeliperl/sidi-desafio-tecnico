import { PRODUCT_LOCATORS } from '../locators/productLocators';

class ProductPage {
    goToForm() {
        cy.get(PRODUCT_LOCATORS.goToFormButton).click();
    }

    fillName(name) {
        name === '' ? cy.get(PRODUCT_LOCATORS.nameInput).clear() : cy.get(PRODUCT_LOCATORS.nameInput).type(name);
    }

    fillPrice(price) {
        price === '' ? cy.get(PRODUCT_LOCATORS.priceInput).clear() : cy.get(PRODUCT_LOCATORS.priceInput).type(price);
    }

    fillDescription(description) {
        description === '' ? cy.get(PRODUCT_LOCATORS.descriptionInput).clear() : cy.get(PRODUCT_LOCATORS.descriptionInput).type(description);
    }

    fillQuantity(quantity) {
        quantity === '' ? cy.get(PRODUCT_LOCATORS.quantityInput).clear() : cy.get(PRODUCT_LOCATORS.quantityInput).type(quantity);
    }

    uploadImage(filePath) {
        cy.get(PRODUCT_LOCATORS.imageInput).selectFile(filePath, { force: true });
    }

    submit() {
        cy.get(PRODUCT_LOCATORS.submitButton).click();
    }

    assertErrorMessageVisible() {
        cy.get(PRODUCT_LOCATORS.errorMessage).should('be.visible');
    }

    searchProduct(name) {
        cy.get(PRODUCT_LOCATORS.searchInput).clear().type(name);
        cy.get(PRODUCT_LOCATORS.searchButton).click();
    }

    assertProductInCardView(name, price) {
        cy.get(PRODUCT_LOCATORS.productCardTitle).should('contain.text', name);
        cy.get(PRODUCT_LOCATORS.productCardPrice).should('contain.text', `$ ${price}`);
    }

    assertProductInTable(name) {
        cy.get(PRODUCT_LOCATORS.tableFirstColumn).should('contain.text', name);
    }

    assertProductNotFound() {
        cy.get(PRODUCT_LOCATORS.notFoundMessage).should('contain.text', 'Nenhum produto foi encontrado');
    }
}

export default new ProductPage();
