// @ts-check
const { test, expect } = require('@playwright/test');
const {
  expectElementsNotVisible,
  validateElementsText,
} = require('./page-utils');

test('Add/remove multiple items to the cart and check the total price', async ({
  page,
}) => {
  await page.goto('http://localhost:1111/');

  // Check and add first item to the cart
  await expect(page.locator('#row_100 .name')).toContainText('iphone 11');
  await expect(page.locator('#row_100 .price')).toContainText('600 RON');
  await expect(page.locator('#row_100 .stock')).toContainText('99');
  await expect(page.locator('#row_100 .used')).toContainText('false');

  await page.click('#row_100 .addCart');

  await expect(page.locator('.myCart')).toContainText(['My cart']);
  await expect(page.locator('#cartSize')).toContainText('[1]');

  //   await expect(page.locator('#row_100 .stock')).toContainText('98');

  // Check and add the second item to the cart'
  await expect(page.locator('#row_104 .name')).toContainText('samsung s21');
  await expect(page.locator('#row_104 .price')).toContainText('500 RON');
  await expect(page.locator('#row_104 .stock')).toContainText('1');
  await expect(page.locator('#row_104 .used')).toContainText('true');

  await page.click('#row_104 .addCart');

  // Expects the cart to be visible
  await expect(page.locator('.myCart')).toContainText(['My cart']);
  await expect(page.locator('#cartSize')).toContainText('[2]');

  // Navigate to cart
  await page.click('.myCart');

  // Expects the cart to be visible
  await expect(page.getByRole('heading', { name: 'My cart' })).toBeVisible();

  // Expects to have the first product in the cart
  await expect(page.locator('#row_100 .name')).toContainText(['iphone 11']);
  await expect(page.locator('#row_100 .stock')).toContainText(['1']);
  await expect(page.locator('#row_100 .used')).toContainText(['false']);
  await expect(page.locator('#row_100 .price')).toContainText(['600 RON']);

  await expect(page.locator('#row_100 .minus')).toBeEnabled;
  await expect(page.locator('#row_100 .minus')).toContainText(['-']);

  await expect(page.locator('#row_100 .plus')).toBeEnabled;
  await expect(page.locator('#row_100 .plus')).toContainText(['+']);

  // Expects to have the second product in the cart
  await expect(page.locator('#row_104 .name')).toContainText(['samsung s21']);
  await expect(page.locator('#row_104 .stock')).toContainText(['1']);
  await expect(page.locator('#row_104 .used')).toContainText(['true']);
  await expect(page.locator('#row_104 .price')).toContainText(['500 RON']);

  await expect(page.locator('#row_104 .minus')).toBeEnabled;
  await expect(page.locator('#row_104 .minus')).toContainText(['-']);

  await expect(page.locator('#row_104 .plus')).toBeEnabled;
  await expect(page.locator('#row_104 .plus')).toContainText(['+']);

  //Check the total and payment button to be available
  await expect(page.locator('#total-price .name')).toContainText(['Total']);
  await expect(page.locator('#total-price .price')).toContainText(['1100 RON']);

  await expect(page.locator('#checkout')).toContainText([
    'Proceed to checkout',
  ]);
  await expect(page.locator('#checkout')).toBeEnabled;

  // Remove elements from the cart
  await page.click('#row_100 .minus');

  await expectElementsNotVisible(
    page,
    '#row_104 .name',
    '#row_104 .stock',
    '#row_104 .used',
    '#row_104 .price',
  );

  // Total price has been updated
  await expect(page.locator('#total-price .price')).toContainText(['500 RON']);

  // Clear cart
  await page.click('.clearCart');

  await expectElementsNotVisible(
    page,
    '#row_104 .name',
    '#row_104 .stock',
    '#row_104 .used',
    '#row_104 .price',
    '#total-price .name',
    '#total-price .price',
    '#checkout',
  );
});
