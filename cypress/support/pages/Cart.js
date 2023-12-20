const productIsNotDisplayed = productd => {
  const rowId = `#row_${productd}`;
  cy.get(`${rowId} .name`).should('not.exist');
  cy.get(`${rowId} .stock`).should('not.exist');
  cy.get(`${rowId} .used`).should('not.exist');
  cy.get(`${rowId} .price`).should('not.exist');
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
