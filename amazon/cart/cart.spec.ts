// ============================================================
// FILE: amazon/cart/cart.spec.ts
// PURPOSE: All test cases for Amazon Cart functionality
//
// REAL FLOWS FROM CODEGEN:
//   Add to cart: search → click product → select qty → Add to cart → checkout
//   Out of stock: search → click product → item unavailable shown
// ============================================================

import { test, expect } from '@playwright/test';
import { CartPage }     from '../pages/CartPage';

test.describe('Amazon Cart', () => {

  test.beforeEach(async ({ page }) => {
    const cartPage = new CartPage(page);
    await cartPage.goto();
  });

  // ── Happy path ────────────────────────────────────────────

  test('TC_CART_01: user can search and find a product', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.searchFor('playwright book');

    // Search results should load
    await expect(page).toHaveURL(/s\?k=/);
    await expect(
      page.locator('.a-link-normal').first()
    ).toBeVisible();
  });

  test('TC_CART_02: user can open a product detail page', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.searchFor('playwright book');
    await cartPage.clickFirstProduct();

    // Product detail page loads
    await expect(page).toHaveURL(/amazon\.com\/.*\/dp\//);
  });

  test('TC_CART_03: Add to Cart button is visible on product page', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.searchFor('playwright book');
    await cartPage.clickFirstProduct();

    await cartPage.expectAddToCartButtonVisible();
  });

  test('TC_CART_04: user can add product to cart and proceed to checkout', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.searchFor('playwright');
    await cartPage.clickFirstProduct();
    await cartPage.clickAddToCart();
    await cartPage.clickProceedToCheckout();

    await cartPage.expectCheckoutPageOrSignIn();
  });

  // ── Out of stock ──────────────────────────────────────────

  test('TC_CART_05: shows unavailable message for out of stock item', async ({ page }) => {
  const cartPage = new CartPage(page);

  await cartPage.searchFor('iphone 17 pro max');

  await page
  .getByRole('searchbox', { name: 'Search Amazon' })
  .press('ArrowDown');

  // Click iPhone 17 pro max suggestion
  await page
    .getByRole('button', { name: 'iphone 17 pro max', exact: true })
    .click();

  // Click first product
  await cartPage.clickFirstProduct();

  // Assert out of stock
  await expect(
    page.locator('#outOfStock')
  ).toBeVisible({ timeout: 10000 });
});

});