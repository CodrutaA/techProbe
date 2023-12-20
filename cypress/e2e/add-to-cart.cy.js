/// <reference types="cypress" />
const { validateCartSize, checkTotalPrice } = require('../support/pages/Cart');
const { addToCart, navigateToCart } = require('../support/pages/Home');
const { validateProductRow } = require('../support/pages/Common');

const [FIRST_TEST_PRODUCT] = require('../fixtures/test-products.json');

describe('Add an item to the cart and check the total price', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Add an item to the cart and check the total price', () => {
    addToCart(100);
    validateCartSize(1);
    navigateToCart();

    validateProductRow(FIRST_TEST_PRODUCT, 1);

    cy.get('#row_100 .minus').should('contain.text', '-');
    cy.get('#row_100 .minus').should('be.enabled');

    cy.get('#row_100 .plus').should('contain.text', '+');
    cy.get('#row_100 .plus').should('be.enabled');

    checkTotalPrice('600 RON');

    //Check the payment button to be available
    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');
  });
});
