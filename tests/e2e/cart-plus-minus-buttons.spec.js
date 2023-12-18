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
});
