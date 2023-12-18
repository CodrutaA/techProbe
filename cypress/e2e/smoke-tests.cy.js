/// <reference types="cypress" />

describe('Smoke tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Home page has correct title', () => {
    // Expect a title "to contain" a substring.
    cy.title().should('have.string', 'e-shop');
  });

  it('Can navigate to cart', () => {
    //Navigate to cart
    cy.get('.myCart').click();

    //Expect the cart to be visible
    cy.title().should('have.string', 'Cart');
  });

  it('Can navigate back to shop from cart', () => {
    cy.visit('http://localhost:1111/cartPage');

    // Navigate to shop
    cy.get('.backShop').click();

    // Expects the shop to be visible
    cy.title().should('have.string', 'e-shop');
  });

  it('Can add an item to cart', () => {
    // Add first item to the cart
    cy.get('#row_100 .addCart').click();

    // Expects 1 product into the cart
    cy.get('#cartSize').should('contain.text', '[1]');
  });
});
