/// <reference types="cypress" />

const {
  productIsNotDisplayed,
  plusProduct,
  minusProduct,
  checkTotalPrice,
  validatePlusMinusButtons,
} = require('../support/pages/Cart');
const { addToCart, navigateToCart } = require('../support/pages/Home');
const { validateProductRow } = require('../support/pages/Common');
const [
  FIRST_TEST_PRODUCT,
  SECOND_TEST_PRODUCT,
] = require('../fixtures/test-products.json');

describe('Cart page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Can add/remove items via +/- buttons', () => {
    addToCart(FIRST_TEST_PRODUCT.id);
    addToCart(SECOND_TEST_PRODUCT.id);

    navigateToCart();

    validateProductRow(FIRST_TEST_PRODUCT, 1);
    validatePlusMinusButtons(FIRST_TEST_PRODUCT.id);

    validateProductRow(SECOND_TEST_PRODUCT, 1);
    validatePlusMinusButtons(SECOND_TEST_PRODUCT.id);

    //Check the total and payment button to be available
    cy.get('#total-price .name').should('contain.text', 'Total');
    checkTotalPrice('1100 RON');

    cy.contains('#checkout', 'Proceed to checkout').should('be.enabled');

    //Reduce the products from the cart
    minusProduct(SECOND_TEST_PRODUCT.id);
    productIsNotDisplayed(SECOND_TEST_PRODUCT.id);

    //Check the total and payment button to be available
    checkTotalPrice('600 RON');
    cy.contains('#checkout', 'Proceed to checkout').should('be.enabled');

    //Add two mode products to the cart
    plusProduct(FIRST_TEST_PRODUCT.id);
    validateProductRow({ ...FIRST_TEST_PRODUCT, price: '1200 RON' }, 2);
    plusProduct(FIRST_TEST_PRODUCT.id);
    validateProductRow({ ...FIRST_TEST_PRODUCT, price: '1800 RON' }, 3);

    checkTotalPrice('1800 RON');

    //Remove products from the cart
    minusProduct(FIRST_TEST_PRODUCT.id);
    validateProductRow({ ...FIRST_TEST_PRODUCT, price: '1200 RON' }, 2);
    checkTotalPrice('1200 RON');

    minusProduct(FIRST_TEST_PRODUCT.id);
    validateProductRow(FIRST_TEST_PRODUCT, 1);
    checkTotalPrice('600 RON');

    minusProduct(FIRST_TEST_PRODUCT.id);
    productIsNotDisplayed(FIRST_TEST_PRODUCT.id);
    cy.get('#total-price .nam').should('not.exist');
    cy.get('#total-price .price').should('not.exist');
    cy.contains('#checkout', 'Proceed to checkout').should('not.exist');
  });
});
