import { PRODUCT_LIST_LOCATORS } from '../locators/productListLocators';

class ProductListPage {
    addProductToList(index = 0) {
        cy.get(PRODUCT_LIST_LOCATORS.addToListButtons).eq(index).click();
    }

    goBackToHome() {
        cy.get(PRODUCT_LIST_LOCATORS.backToHomeButton).eq(0).click();
    }

    increaseProductQuantity(index = 0, times = 1) {
        Cypress._.times(times, () => {
            cy.get(PRODUCT_LIST_LOCATORS.increaseQuantityButtons).eq(index).click();
        });
    }

    decreaseProductQuantity(index = 0, times = 1) {
        Cypress._.times(times, () => {
            cy.get(PRODUCT_LIST_LOCATORS.decreaseQuantityButtons).eq(index).click();
        });
    }

    assertProductVisibleInCart() {
        cy.get(PRODUCT_LIST_LOCATORS.shoppingCartProductName).should('be.visible');
    }

    assertRedirectToCart() {
        cy.url().should('include', '/minhaListaDeProdutos');
    }
}

export default new ProductListPage();
