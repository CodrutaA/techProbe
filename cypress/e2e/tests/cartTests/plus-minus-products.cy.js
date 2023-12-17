/// <reference types="cypress" />

context(
  'Add/remove multiple items to the cart and check the total price',
  () => {
    beforeEach(() => {
      cy.visit('http://localhost:1111/');
    });

    describe('Add/remove multiple items to the cart and check the total price', () => {
      it('e-Shop', () => {
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
      });
    });
  },
);
