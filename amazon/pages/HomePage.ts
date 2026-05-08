// ============================================================
// FILE: amazon/pages/HomePage.ts
// PURPOSE: All ACTIONS for Amazon homepage.
//          Selectors come from HomeLocators.ts — NOT here.
// ============================================================

import { Page, expect } from '@playwright/test';
import { HomeLocators } from './locators/HomeLocators';

export class HomePage {

  constructor(private page: Page) {}

  // ── Navigation ────────────────────────────────────────────

  async goto() {
    await this.page.goto('/');
  }

  // ── Actions ───────────────────────────────────────────────

  async searchFor(keyword: string) {
    await this.page.locator(HomeLocators.searchInput).fill(keyword);
    await this.page.locator(HomeLocators.searchButton).click();
  }

  async clickAccountMenu() {
    await this.page.locator(HomeLocators.accountMenu).click();
  }

  async clickCart() {
    await this.page.locator(HomeLocators.cartIcon).click();
  }

  // ── Assertions ────────────────────────────────────────────

  async expectUserLoggedIn(name: string) {
    await expect(
      this.page.locator(HomeLocators.accountGreeting)
    ).toContainText(`Hello, ${name}`);
  }

  async expectUserNotLoggedIn() {
    await expect(
      this.page.locator(HomeLocators.signInPrompt)
    ).toContainText('Hello, sign in');
  }

  async getCartCount(): Promise<string | null> {
    return this.page.locator(HomeLocators.cartCount).textContent();
  }
}