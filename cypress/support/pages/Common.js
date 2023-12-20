const validateProductRow = ({ id, name, used, price }, stock) => {
  const rowId = `#row_${id}`;
  cy.get(`${rowId} .name`).should('contain.text', name);
  cy.get(`${rowId} .stock`).should('contain.text', stock);
  cy.get(`${rowId} .used`).should('contain.text', used);
  cy.get(`${rowId} .price`).should('contain.text', price);
};

module.exports = {
  validateProductRow,
};
