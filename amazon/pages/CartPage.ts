// ============================================================
// FILE: amazon/pages/CartPage.ts
// PURPOSE: All ACTIONS for Amazon search, product, and cart.
//          Selectors come from CartLocators.ts — NOT here.
// ============================================================

import { Page, expect } from '@playwright/test';
import { CartLocators } from './locators/CartLocators';

export class CartPage {

  constructor(private page: Page) {}

  // ── Navigation ────────────────────────────────────────────

  async goto() {
    await this.page.goto('https://www.amazon.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Search ────────────────────────────────────────────────

  async searchFor(keyword: string) {
    await this.page
      .getByRole('searchbox', { name: CartLocators.searchBox })
      .fill(keyword);
    await this.page
      .getByRole('searchbox', { name: CartLocators.searchBox })
      .press('Enter');
  }

  // ── Click first product in results ────────────────────────

  async clickFirstProduct() {
    await this.page
      .locator(CartLocators.firstProduct)
      .first()
      .click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Select quantity ───────────────────────────────────────

  async selectQuantity(qty: string) {
    await this.page
      .getByText(CartLocators.quantityDropdown)
      .click();
    await this.page
      .getByRole('option', { name: qty, exact: true })
      .click();
  }

  // ── Add to cart ───────────────────────────────────────────

  async clickAddToCart() {
    await this.page
      .getByRole('button', { name: CartLocators.addToCartButton, exact: true })
      .click();
  }

  // ── Proceed to checkout ───────────────────────────────────

  async clickProceedToCheckout() {
    await this.page
      .getByRole('button', { name: CartLocators.proceedToCheckout })
      .click();
  }

  // ── Full add to cart flow ─────────────────────────────────

  async addProductToCart(keyword: string, qty?: string) {
    await this.searchFor(keyword);
    await this.clickFirstProduct();
    if (qty) {
      await this.selectQuantity(qty);
    }
    await this.clickAddToCart();
  }

  // ── Assertions ────────────────────────────────────────────

  async expectAddToCartButtonVisible() {
    await expect(
      this.page.getByRole('button', { name: CartLocators.addToCartButton, exact: true })
    ).toBeVisible();
  }

  async expectCheckoutPageOrSignIn() {
    // After checkout click — shows signin if not logged in
    await expect(
      this.page.getByRole('heading', { name: CartLocators.signInHeading })
    ).toBeVisible({ timeout: 15000 });
  }

  async expectOutOfStock() {
    await expect(
      this.page.locator('#outOfStock')
    ).toBeVisible({ timeout: 10000 });
  }

  async expectCannotShipToLocation() {
    await expect(
      this.page.getByText(CartLocators.cannotShipText)
    ).toBeVisible({ timeout: 10000 });
  }

  async expectAddToCartNotVisible() {
    await expect(
      this.page.getByRole('button', { name: CartLocators.addToCartButton, exact: true })
    ).not.toBeVisible({ timeout: 10000 });
  }
}