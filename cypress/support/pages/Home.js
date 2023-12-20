const addToCart = productId => {
  cy.get(`#row_${productId} .addCart`).click();
};

module.exports = {
  addToCart,
};
