/// <reference types="cypress" />

describe('Cart page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1111/');
  });

  it('Can add/remove items via +/- buttons', () => {
    // Check and add first item to the cart
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    cy.get('#row_100 .stock').should('contain.text', '99');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '600 RON');

    cy.get('#row_100 .addCart').click();

    cy.get('.myCart').should('contain.text', 'My cart');
    cy.get('#cartSize').should('contain.text', '[1]');

    // cy.get(#row_100 .stock).should('contain.text', '98');

    // Check and add the second item to the cart'
    cy.get('#row_104 .name').should('contain.text', 'samsung s21');
    cy.get('#row_104 .stock').should('contain.text', '1');
    cy.get('#row_104 .used').should('contain.text', 'true');
    cy.get('#row_104 .price').should('contain.text', '500 RON');

    cy.get('#row_104 .addCart').click();

    // Expects the cart to be visible
    cy.get('.myCart').should('contain.text', 'My cart');
    cy.get('#cartSize').should('contain.text', '[2]');

    // Check and add the third item to the cart
    cy.get('#row_109 .name').should('contain.text', 'samsung s8');
    cy.get('#row_109 .stock').should('contain.text', '1');
    cy.get('#row_109 .used').should('contain.text', 'true');
    cy.get('#row_109 .price').should('contain.text', '100 RON');

    cy.get('#row_109 .addCart').click();

    // Expects the cart to be visible
    cy.get('.myCart').should('contain.text', 'My cart');
    cy.get('#cartSize').should('contain.text', '[3]');

    //Add again th first item
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    //  cy.get('#row_100 .stock').should('contain.text', '99');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '600 RON');

    cy.get('#row_100 .addCart').click();

    cy.get('.myCart').should('contain.text', 'My cart');
    cy.get('#cartSize').should('contain.text', '[4]');

    // Navigate to cart
    cy.get('.myCart').click();

    // Expects the cart to be visible
    cy.title().should('have.string', 'Cart');

    // Expects to have the first product in the cart
    cy.get('#row_100 .name').should('contain.text', 'iphone 11');
    cy.get('#row_100 .stock').should('contain.text', '2');
    cy.get('#row_100 .used').should('contain.text', 'false');
    cy.get('#row_100 .price').should('contain.text', '1200 RON');

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

    // Expects to have the third product in the cart
    cy.get('#row_109 .name').should('contain.text', 'samsung s8');
    cy.get('#row_109 .stock').should('contain.text', '1');
    cy.get('#row_109 .used').should('contain.text', 'true');
    cy.get('#row_109 .price').should('contain.text', '100 RON');

    cy.get('#row_109 .minus').should('contain.text', '-');
    cy.get('#row_109 .minus').should('be.enabled');

    cy.get('#row_109 .plus').should('contain.text', '+');
    cy.get('#row_109 .plus').should('be.enabled');

    //Check the total and payment button to be available
    cy.get('#total-price .name').should('contain.text', 'Total');
    cy.get('#total-price .price').should('contain.text', '1800 RON');

    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');

    // Back to shop
    cy.get('.backShop').click();
    cy.get('.myCart').should('contain.text', 'My cart');
    cy.get('#cartSize').should('contain.text', '[4]');

    //Navigate to cart
    cy.get('.myCart').click();

    //Reduce the products from the cart
    cy.get('#row_104 .minus').click();

    cy.get('#row_104 .name').should('not.exist');
    cy.get('#row_104 .stock').should('not.exist');
    cy.get('#row_104 .used').should('not.exist');
    cy.get('#row_104 .price').should('not.exist');

    //Check the total and payment button to be available
    cy.get('#total-price .name').should('contain.text', 'Total');
    cy.get('#total-price .price').should('contain.text', '1300 RON');

    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');

    //Add products to the cart ( workaround)
    cy.get('#row_100 .plus').click();
    cy.get('#row_100 .plus').click();

    cy.get('#row_100 .stock').should('contain.text', '3');
    cy.get('#total-price .price').should('contain.text', '1900 RON');
    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');

    //Remove products from the cart
    cy.get('#row_100 .minus').click();

    cy.get('#row_100 .name').should('not.exist');
    cy.get('#row_100 .stock').should('not.exist');
    cy.get('#row_100 .used').should('not.exist');
    cy.get('#row_100 .price').should('not.exist');

    cy.get('#row_109 .stock').should('contain.text', '1');
    cy.get('#total-price .price').should('contain.text', '100 RON');
    cy.get('#checkout').should('contains.text', 'Proceed to checkout');
    cy.get('#checkout').should('be.enabled');
  });
});
