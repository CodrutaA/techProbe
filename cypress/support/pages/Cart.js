const productIsNotDisplayed = productd => {
  cy.get(`#row_${productd}`).should('not.exist');
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

module.exports = {
  productIsNotDisplayed,
  plusProduct,
  minusProduct,
  checkTotalPrice,
};
