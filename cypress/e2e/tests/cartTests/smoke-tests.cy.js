/// <reference types="cypress" />

context('Smoke tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  describe('Page has title', () => {
    it('e-Shop', () => {
      // Expect a title "to contain" a substring.
      cy.title().should('have.string', 'e-shop');
    });
  });

  describe('Open', () => {
    it('MyCart', () => {
      //Navigate to cart
      cy.get('.myCart').click();

      //Expect the cart to be visible
      cy.title().should('have.string', 'Cart');
    });
  });

  describe('Navigate back to shop from cart', () => {
    it('', () => {
      cy.visit('http://localhost:1111/cartPage');

      // Navigate to shop
      cy.get('.backShop').click();

      // Expects the shop to be visible
      cy.title().should('have.string', 'e-shop');
    });
  });

  describe('Add an item to cart', () => {
    it('', () => {
      // Add first item to the cart
      cy.get('#row_100 .addCart').click();

      // Expects 1 product into the cart
      cy.get('#cartSize').should('contain.text', '[1]');
    });
  });
});
