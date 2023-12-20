const productIsNotDisplayed = productId => {
  cy.get(`#row_${productId}`).should('not.exist');
};

const plusProduct = productId => {
  cy.get(`#row_${productId} .plus`).click();
};

const minusProduct = productId => {
  cy.get(`#row_${productId} .minus`).click();
};

const checkTotalPrice = expectedPrice => {
  cy.get('#total-price .price').should('contain.text', expectedPrice);
};

const clearCart = () => {
  cy.get('.clearCart').click();
};

const navigateToShoppingPage = () => {
  cy.get('.backShop').click();
  cy.title().should('have.string', 'e-shop');
};

const validateCartSize = expectedSize => {
  cy.get('.myCart').should('contain.text', 'My cart');
  cy.get('#cartSize').should('contain.text', `[${expectedSize}]`);
};

const validatePlusMinusButtons = productId => {
  cy.get(`#row_${productId} .minus`).should('contain.text', '-');
  cy.get(`#row_${productId} .minus`).should('be.enabled');
  cy.get(`#row_${productId} .plus`).should('contain.text', '+');
  cy.get(`#row_${productId} .plus`).should('be.enabled');
};

module.exports = {
  productIsNotDisplayed,
  plusProduct,
  minusProduct,
  checkTotalPrice,
  clearCart,
  validateCartSize,
  navigateToShoppingPage,
  validatePlusMinusButtons,
};
