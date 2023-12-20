/// <reference types="cypress" />

const {
  validateCartSize,
  productIsNotDisplayed,
  minusProduct,
  checkTotalPrice,
  clearCart,
} = require('../support/pages/Cart');
const { addToCart, navigateToCart } = require('../support/pages/Home');

describe('Add/remove items to/from cart', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Add/remove multiple items to the cart and check the total price', () => {
    // Check and add first item to the cart
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    cy.get('#row_100 .stock').should('contain.text', '99');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '600 RON');
    addToCart(100);
    validateCartSize(1);

    // Check and add the second item to the cart'
    cy.get('#row_104 .name').should('contain.text', 'samsung s21');
    cy.get('#row_104 .stock').should('contain.text', '1');
    cy.get('#row_104 .used').should('contain.text', 'true');
    cy.get('#row_104 .price').should('contain.text', '500 RON');
    addToCart(104);
    validateCartSize(2);

    navigateToCart();

    // Expects to have the first product in the cart
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    cy.get('#row_100 .stock').should('contain.text', '1');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '600 RON');

    cy.get('#row_100 .minus').should('contain.text', '-');
    cy.get('#row_100 .minus').should('be.enabled');

    cy.get('#row_100 .plus').should('contain.text', '+');
    cy.get('#row_100 .plus').should('be.enabled');

    // Expects to have the second product in the cart
    cy.get('#row_104 .name').should('contain.text', 'samsung s21');
    cy.get('#row_104 .stock').should('contain.text', '1');
    cy.get('#row_104 .used').should('contain.text', 'true');
    cy.get('#row_104 .price').should('contain.text', '500 RON');

    cy.get('#row_104 .minus').should('contain.text', '-');
    cy.get('#row_104 .minus').should('be.enabled');

    cy.get('#row_104 .plus').should('contain.text', '+');
    cy.get('#row_104 .plus').should('be.enabled');

    //Check the total and payment button to be available
    checkTotalPrice('1100 RON');

    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');

    // Remove elements from the cart
    minusProduct(100);
    productIsNotDisplayed(100);
    checkTotalPrice('500 RON');

    // Clear cart
    clearCart();

    cy.get('#total-price .nam').should('not.exist');
    cy.get('#total-price .price').should('not.exist');
    cy.get('#checkout').should('not.exist');
  });
});
