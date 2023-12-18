/// <reference types="cypress" />

describe('Add an item to the cart and check the total price', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Add an item to the cart and check the total price', () => {
    // Add first item to the cart
    cy.get('#row_100 .addCart').click();

    // Expects the cart to be visible
    cy.get('.myCart').should('contain.text', 'My cart');
    cy.get('#cartSize').should('contain.text', '[1]');

    // Navigate to cart
    cy.get('.myCart').click();

    // Expects the cart to be visible
    cy.title().should('have.string', 'Cart');

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
