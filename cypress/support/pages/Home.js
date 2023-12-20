const addToCart = productId => {
  cy.get(`#row_${productId} .addCart`).click();
};

const navigateToCart = () => {
  cy.get('.myCart').click();
  cy.title().should('have.string', 'Cart');
};

module.exports = {
  addToCart,
  navigateToCart,
};
