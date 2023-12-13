// @ts-check
const { test, expect } = require('@playwright/test');

test('Page has title', async ({ page }) => {
  await page.goto('http://localhost:1111/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/e-shop/);
});

test('Open cart', async ({ page }) => {
  await page.goto('http://localhost:1111/');

  // Navigate to cart
  await page.click('.myCart');

  // Expects the cart to be visible
  await expect(page.getByRole('heading', { name: 'My cart' })).toBeVisible();
});

test('Navigate back to shop from cart', async ({ page }) => {
  await page.goto('http://localhost:1111/cartPage');

  // Navigate to shop
  await page.click('.backShop');

  // Expects the shop to be visible
  await expect(page).toHaveTitle(/e-shop/);
});

test('Add an item to cart', async ({ page }) => {
  await page.goto('http://localhost:1111/');

  // Add first item to the cart
  await page.click('.addCart');
});
