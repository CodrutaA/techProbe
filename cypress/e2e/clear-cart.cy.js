/// <reference types="cypress" />

const {
  validateCartSize,
  productIsNotDisplayed,
  validatePlusMinusButtons,
  checkTotalPrice,
  clearCart,
} = require('../support/pages/Cart');
const { addToCart, navigateToCart } = require('../support/pages/Home');
const { validateProductRow } = require('../support/pages/Common');

const [
  FIRST_TEST_PRODUCT,
  SECOND_TEST_PRODUCT,
] = require('../fixtures/test-products.json');

describe('Add/remove items to/from cart', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Add/remove multiple items to the cart and check the total price', () => {
    // Check and add first item to the cart
    validateProductRow(FIRST_TEST_PRODUCT, 99);
    addToCart(100);
    validateCartSize(1);

    // Check and add the second item to the cart'
    validateProductRow(SECOND_TEST_PRODUCT, 1);
    addToCart(104);
    validateCartSize(2);

    navigateToCart();

    // Expects to have the first product in the cart
    validateProductRow(FIRST_TEST_PRODUCT, 1);
    validatePlusMinusButtons(FIRST_TEST_PRODUCT.id);

    // Expects to have the second product in the cart
    validateProductRow(SECOND_TEST_PRODUCT, 1);
    validatePlusMinusButtons(SECOND_TEST_PRODUCT.id);

    //Check the total and payment button to be available
    checkTotalPrice('1100 RON');

    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');

    clearCart();

    productIsNotDisplayed(FIRST_TEST_PRODUCT.id);
    productIsNotDisplayed(SECOND_TEST_PRODUCT.id);
    cy.get('#total-price .name').should('not.exist');
    cy.get('#total-price .price').should('not.exist');
    cy.get('#checkout').should('not.exist');
  });
});
