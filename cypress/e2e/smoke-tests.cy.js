/// <reference types="cypress" />

const { navigateToCart, addToCart } = require('../support/pages/Home');
const {
  navigateToShoppingPage,
  validateCartSize,
} = require('../support/pages/Cart');

describe('Smoke tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Home page has correct title', () => {
    // Expect a title "to contain" a substring.
    cy.title().should('have.string', 'e-shop');
  });

  it('Can navigate to cart', () => {
    navigateToCart();
  });

  it('Can navigate back to shop from cart', () => {
    cy.visit('http://localhost:1111/cartPage');
    navigateToShoppingPage();
  });

  it('Can add an item to cart', () => {
    addToCart(100);
    validateCartSize(1);
  });
});
