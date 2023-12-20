/// <reference types="cypress" />
const { validateCartSize } = require('../support/pages/Cart');
const { addToCart, navigateToCart } = require('../support/pages/Home');

describe('Add an item to the cart and check the total price', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Add an item to the cart and check the total price', () => {
    addToCart(100);
    validateCartSize(1);
    navigateToCart();

    // Expects to have the product in the cart
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    cy.get('#row_100 .stock').should('contain.text', '1');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '600 RON');

    cy.get('#row_100 .minus').should('contain.text', '-');
    cy.get('#row_100 .minus').should('be.enabled');

    cy.get('#row_100 .plus').should('contain.text', '+');
    cy.get('#row_100 .plus').should('be.enabled');

    //Check the total and payment button to be available
    cy.get('#total-price .name').should('contain.text', 'Total');
    cy.get('#total-price .price').should('contain.text', '600 RON');

    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');
  });
});
