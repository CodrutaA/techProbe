// @ts-check
const { test, expect } = require('@playwright/test');
const {
  expectElementsNotVisible,
  validateElementsText,
} = require('./page-utils');

test('Can add/remove items via +/- buttons from Cart page', async ({
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

  // Check and add the third item to the cart
  await expect(page.locator('#row_109 .name')).toContainText('samsung s8');
  await expect(page.locator('#row_109 .price')).toContainText('100 RON');
  await expect(page.locator('#row_109 .stock')).toContainText('1');
  await expect(page.locator('#row_109 .used')).toContainText('true');

  await page.click('#row_109 .addCart');

  // Expects the cart to be visible
  await expect(page.locator('.myCart')).toContainText(['My cart']);
  await expect(page.locator('#cartSize')).toContainText('[3]');

  //Add again th first item
  await expect(page.locator('#row_100 .name')).toContainText('iphone 11');
  await expect(page.locator('#row_100 .price')).toContainText('600 RON');
  //   await expect(page.locator('#row_100 .stock')).toContainText('99');
  await expect(page.locator('#row_100 .used')).toContainText('false');

  await page.click('#row_100 .addCart');

  await expect(page.locator('.myCart')).toContainText(['My cart']);
  await expect(page.locator('#cartSize')).toContainText('[4]');

  // Navigate to cart
  await page.click('.myCart');

  // Expects the cart to be visible
  await expect(page.getByRole('heading', { name: 'My cart' })).toBeVisible();

  // Expects to have the first product in the cart
  await expect(page.locator('#row_100 .name')).toContainText(['iphone 11']);
  await expect(page.locator('#row_100 .stock')).toContainText(['2']);
  await expect(page.locator('#row_100 .used')).toContainText(['false']);
  await expect(page.locator('#row_100 .price')).toContainText(['1200 RON']);

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

  // Expects to have the third product in the cart
  await expect(page.locator('#row_109 .name')).toContainText(['samsung s8']);
  await expect(page.locator('#row_109 .stock')).toContainText(['1']);
  await expect(page.locator('#row_109 .used')).toContainText(['true']);
  await expect(page.locator('#row_109 .price')).toContainText(['100 RON']);

  await expect(page.locator('#row_109 .minus')).toBeEnabled;
  await expect(page.locator('#row_109 .minus')).toContainText(['-']);

  await expect(page.locator('#row_109 .plus')).toBeEnabled;
  await expect(page.locator('#row_109 .plus')).toContainText(['+']);

  //Check the total and payment button to be available
  await expect(page.locator('#total-price .name')).toContainText(['Total']);
  await expect(page.locator('#total-price .price')).toContainText(['1800 RON']);

  await expect(page.locator('#checkout')).toContainText([
    'Proceed to checkout',
  ]);
  await expect(page.locator('#checkout')).toBeEnabled;

  // Back to shop
  await page.click('.backShop');
  await expect(page.locator('.myCart')).toContainText(['My cart']);
  await expect(page.locator('#cartSize')).toContainText('[4]');

  // Navigate to cart
  await page.click('.myCart');

  //Reduce the products from the cart
  await page.click('#row_104 .minus');

  await expectElementsNotVisible(
    page,
    '#row_104 .name',
    '#row_104 .stock',
    '#row_104 .used',
    '#row_104 .price',
  );

  //Check the total and payment button to be available
  await expect(page.locator('#total-price .name')).toContainText(['Total']);
  await expect(page.locator('#total-price .price')).toContainText(['1300 RON']);

  await expect(page.locator('#checkout')).toContainText([
    'Proceed to checkout',
  ]);
  await expect(page.locator('#checkout')).toBeEnabled;

  //Add products to the cart ( workaround)
  await page.click('#row_100 .plus');
  await page.click('#row_100 .plus');
  await page.click('#row_100 .plus');
  await page.click('#row_100 .plus');

  await expect(page.locator('#row_100 .stock')).toContainText(['3']);
  await expect(page.locator('#total-price .price')).toContainText(['1900 RON']);
  await expect(page.locator('#checkout')).toContainText([
    'Proceed to checkout',
  ]);
  await expect(page.locator('#checkout')).toBeEnabled;

  //Remove products from the cart
  await page.click('#row_100 .minus');
  await page.click('#row_100 .minus');
  await page.click('#row_100 .minus');

  await expectElementsNotVisible(
    page,
    '#row_100 .name',
    '#row_100 .stock',
    '#row_100 .used',
    '#row_100 .price',
  );

  await expect(page.locator('#row_109 .stock')).toContainText(['1']);
  await expect(page.locator('#total-price .price')).toContainText(['1000 RON']);
  await expect(page.locator('#checkout')).toContainText([
    'Proceed to checkout',
  ]);
  await expect(page.locator('#checkout')).toBeEnabled;
});
