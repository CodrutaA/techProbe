/// <reference types="cypress" />

const {
  productIsNotDisplayed,
  plusProduct,
  minusProduct,
  checkTotalPrice,
} = require('../support/pages/Cart');

const { addToCart, navigateToCart } = require('../support/pages/Home');

const FIRST_PRODUCT_ID = 100;
const SECOND_PRODUCT_ID = 104;

describe('Cart page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Can add/remove items via +/- buttons', () => {
    addToCart(FIRST_PRODUCT_ID);
    addToCart(SECOND_PRODUCT_ID);

    navigateToCart();

    // Expects to have product with id 100 in the cart
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    cy.get('#row_100 .stock').should('contain.text', '1');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '600 RON');

    cy.get('#row_100 .minus').should('contain.text', '-');
    cy.get('#row_100 .minus').should('be.enabled');

    cy.get('#row_100 .plus').should('contain.text', '+');
    cy.get('#row_100 .plus').should('be.enabled');

    // Expects to have product with id 104 in the cart
    cy.get('#row_104 .name').should('contain.text', 'samsung s21');
    cy.get('#row_104 .stock').should('contain.text', '1');
    cy.get('#row_104 .used').should('contain.text', 'true');
    cy.get('#row_104 .price').should('contain.text', '500 RON');

    cy.get('#row_104 .minus').should('contain.text', '-');
    cy.get('#row_104 .minus').should('be.enabled');

    cy.get('#row_104 .plus').should('contain.text', '+');
    cy.get('#row_104 .plus').should('be.enabled');

    //Check the total and payment button to be available
    cy.get('#total-price .name').should('contain.text', 'Total');
    checkTotalPrice('1100 RON');

    cy.contains('#checkout', 'Proceed to checkout').should('be.enabled');

    //Reduce the products from the cart
    minusProduct(SECOND_PRODUCT_ID);
    productIsNotDisplayed(SECOND_PRODUCT_ID);

    //Check the total and payment button to be available
    checkTotalPrice('600 RON');
    cy.contains('#checkout', 'Proceed to checkout').should('be.enabled');

    //Add two mode products to the cart
    plusProduct(FIRST_PRODUCT_ID);
    plusProduct(FIRST_PRODUCT_ID);

    cy.get('#row_100 .stock').should('contain.text', '3');
    checkTotalPrice('1800 RON');

    //Remove products from the cart
    minusProduct(FIRST_PRODUCT_ID);
    cy.get('#row_100 .stock').should('contain.text', '2');
    checkTotalPrice('1200 RON');

    minusProduct(FIRST_PRODUCT_ID);
    cy.get('#row_100 .stock').should('contain.text', '1');
    checkTotalPrice('600 RON');

    minusProduct(FIRST_PRODUCT_ID);
    productIsNotDisplayed(FIRST_PRODUCT_ID);
    cy.get('#total-price .nam').should('not.exist');
    cy.get('#total-price .price').should('not.exist');
    cy.contains('#checkout', 'Proceed to checkout').should('not.exist');
  });
});
