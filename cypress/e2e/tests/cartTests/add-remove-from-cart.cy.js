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

        // Navigate to cart
        cy.get('.myCart').click();

        // Expects the cart to be visible
        cy.title().should('have.string', 'Cart');

        // Expects to have the first product in the cart
        cy.get('#row_100 .name').should('contain.text', 'iphone 11');
        cy.get('#row_100 .stock').should('contain.text', '1');
        cy.get('#row_100 .used').should('contain.text', 'false');
        cy.get('#row_100 .price').should('contain.text', '600 RON');

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

        //Check the total and payment button to be available
        cy.get('#total-price .name').should('contain.text', 'Total');
        cy.get('#total-price .price').should('contain.text', '1100 RON');

        cy.get('#checkout').should('contains.text', 'Proceed to checkout');
        cy.get('#checkout').should('be.enabled');

        // Remove elements from the cart
        cy.get('#row_100 .minus').click();

        cy.get('#row_100 .name').should('not.exist');
        cy.get('#row_100 .stock').should('not.exist');
        cy.get('#row_100 .used').should('not.exist');
        cy.get('#row_100 .price').should('not.exist');

        // Total price has been updated
        cy.get('#total-price .price').should('contain.text', '500 RON');

        // Clear cart
        cy.get('.clearCart').click();

        cy.get('#row_104 .name').should('not.exist');
        cy.get('#row_104 .stock').should('not.exist');
        cy.get('#row_104 .used').should('not.exist');
        cy.get('#row_104 .price').should('not.exist');

        cy.get('#total-price .name').should('not.exist');
        cy.get('#total-price .price').should('not.exist');
        cy.get('#checkout').should('not.exist');
      });
    });
  },
);
