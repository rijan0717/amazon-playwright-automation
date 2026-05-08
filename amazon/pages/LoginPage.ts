// ============================================================
// FILE: amazon/pages/LoginPage.ts
// PURPOSE: All ACTIONS for Amazon login flow.
//          Selectors come from LoginLocators.ts — NOT here.
//
// REAL AMAZON LOGIN FLOW:
//   1. Homepage → click "Hello, sign in Account & Lists"
//   2. Enter email → click Continue
//   3. Enter password → click Sign in
// ============================================================

import { Page, expect } from '@playwright/test';
import { LoginLocators } from './locators/LoginLocators';

export class LoginPage {

  constructor(private page: Page) {}

  // ── Navigation ────────────────────────────────────────────

  async goto() {
    await this.page.goto('https://www.amazon.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Step 1: Click account menu ────────────────────────────

  async clickAccountMenu() {
    await this.page
      .getByRole('link', { name: LoginLocators.accountMenuLink })
      .click();
  }

  // ── Step 2: Enter email and continue ─────────────────────

  async enterEmailAndContinue(email: string) {
    await this.page
      .getByRole('textbox', { name: LoginLocators.emailOrMobileInput })
      .fill(email);
    await this.page
      .getByRole('button', { name: LoginLocators.continueButton })
      .click();
  }

  // ── Step 3: Enter password and sign in ───────────────────

  async enterPasswordAndSignIn(password: string) {
    await this.page
      .getByRole('textbox', { name: LoginLocators.passwordInput })
      .waitFor({ state: 'visible' });
    await this.page
      .getByRole('textbox', { name: LoginLocators.passwordInput })
      .fill(password);
    await this.page
      .getByRole('button', { name: LoginLocators.signInButton })
      .click();
  }

  // ── Full login flow in one call ───────────────────────────

  async login(email: string, password: string) {
    await this.clickAccountMenu();
    await this.enterEmailAndContinue(email);
    await this.enterPasswordAndSignIn(password);
  }

  // ── Assertions ────────────────────────────────────────────

  async expectLoginSuccess() {
    await expect(
      this.page.locator(LoginLocators.accountGreeting)
    ).not.toContainText('Hello, sign in', { timeout: 15000 });
  }

  async expectEmptyEmailError() {
    await expect(
      this.page.getByText(LoginLocators.emptyEmailError)
    ).toBeVisible();
  }

  async expectInvalidEmailError() {
    await expect(
      this.page.getByText(LoginLocators.invalidEmailError)
    ).toBeVisible();
  }

  async expectNoAccountError() {
    await expect(
      this.page.getByText(LoginLocators.noAccountError)
    ).toBeVisible();
  }

  async expectIncorrectPasswordError() {
    await expect(
      this.page.getByText(LoginLocators.incorrectPassError)
    ).toBeVisible();
  }
}