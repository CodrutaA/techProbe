// @ts-check
const { test, expect } = require('@playwright/test');

test('Add an item to the cart and check the total price', async ({ page }) => {
  await page.goto('http://localhost:1111/');

  // Add first item to the cart
  await page.click('#row_100 .addCart');

  // Expects the cart to be visible
  await expect(page.locator('.myCart')).toContainText(['My cart']);
  await expect(page.locator('#cartSize')).toContainText('[1]');

  // Navigate to cart
  await page.click('.myCart');

  // Expects the cart to be visible
  await expect(page.getByRole('heading', { name: 'My cart' })).toBeVisible();

  // Expects to have the product in the cart
  await expect(page.locator('#row_100 .name')).toContainText(['iphone 11']);
  await expect(page.locator('#row_100 .stock')).toContainText(['1']);
  await expect(page.locator('#row_100 .used')).toContainText(['false']);
  await expect(page.locator('#row_100 .price')).toContainText(['600 RON']);

  await expect(page.locator('#row_100 .minus')).toBeEnabled;
  await expect(page.locator('#row_100 .minus')).toContainText(['-']);

  await expect(page.locator('#row_100 .plus')).toBeEnabled;
  await expect(page.locator('#row_100 .plus')).toContainText(['+']);

  //Check the total and payment button to be available
  await expect(page.locator('#total-price .name')).toContainText(['Total']);
  await expect(page.locator('#total-price .price')).toContainText(['600 RON']);

  await expect(page.locator('#checkout')).toContainText([
    'Proceed to checkout',
  ]);
  await expect(page.locator('#checkout')).toBeEnabled;
});
