// ============================================================
// FILE: amazon/pages/SignupPage.ts
// PURPOSE: All ACTIONS for Amazon signup flow.
//          Selectors come from SignupLocators.ts — NOT here.
//
// REAL AMAZON SIGNUP FLOW (multi-step):
//   1. Homepage → click "Hello, sign in Account & Lists"
//   2. Enter email → click Continue
//   3. Click "Proceed to create an account"
//   4. Fill name, password, confirm password
//   5. Click "Continue Verify mobile number"
// ============================================================

import { Page, expect } from '@playwright/test';
import { SignupLocators } from './locators/SignupLocators';

export class SignupPage {

  constructor(private page: Page) {}

  // ── Navigation ────────────────────────────────────────────

  async goto() {
    await this.page.goto('https://www.amazon.com/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ── Step 1: Click account menu on homepage ────────────────

  async clickAccountMenu() {
    await this.page
      .getByRole('link', { name: SignupLocators.accountMenuLink })
      .click();
  }

  // ── Step 2: Enter email and continue ─────────────────────

  async enterEmailAndContinue(email: string) {
    await this.page
      .getByRole('textbox', { name: SignupLocators.emailOrMobileInput })
      .fill(email);
    await this.page
      .getByRole('button', { name: SignupLocators.continueButton })
      .click();
  }

  // ── Step 3: Click proceed to create account ───────────────

  async clickProceedToCreateAccount() {
    await this.page
      .getByRole('button', { name: SignupLocators.proceedToCreateBtn })
      .click();
  }

  // ── Step 4: Fill registration form ───────────────────────

  async fillName(name: string) {
    await this.page
      .getByRole('textbox', { name: SignupLocators.nameInput })
      .fill(name);
  }

  async fillPassword(password: string) {
    await this.page
      .getByRole('textbox', { name: SignupLocators.passwordInput })
      .fill(password);
  }

  async fillConfirmPassword(password: string) {
    await this.page
      .getByRole('textbox', { name: SignupLocators.confirmPasswordInput })
      .fill(password);
  }

  // ── Step 5: Submit form ───────────────────────────────────

  async clickContinue() {
    await this.page
      .getByRole('button', { name: SignupLocators.submitButton })
      .click();
  }

  // ── Full signup flow in one call ──────────────────────────

  async registerUser(name: string, email: string, password: string) {
    await this.clickAccountMenu();
    await this.enterEmailAndContinue(email);
    await this.clickProceedToCreateAccount();
    await this.fillName(name);
    await this.fillPassword(password);
    await this.fillConfirmPassword(password);
    await this.clickContinue();
  }

  // ── Assertions ────────────────────────────────────────────

  async expectRegistrationFormVisible() {
    await expect(
      this.page.getByRole('textbox', { name: SignupLocators.nameInput })
    ).toBeVisible();
  }

  async expectNameError() {
    await expect(
      this.page.getByText(SignupLocators.nameEmptyError)
    ).toBeVisible();
  }

  async expectEmailError() {
    await expect(
      this.page.locator(SignupLocators.emailError)
    ).toBeVisible();
  }

  async expectPasswordTooShortError() {
    // Real selector from codegen: #auth-password-invalid-password-alert
    await expect(
      this.page
        .locator(SignupLocators.passwordTooShortError)
        .getByText('Minimum 6 characters required')
    ).toBeVisible();
  }

  async expectPasswordMismatchError() {
    await expect(
      this.page.getByText(SignupLocators.passwordMismatchError)
    ).toBeVisible();
  }

  async expectAlertError() {
    await expect(
      this.page.locator(SignupLocators.alertError)
    ).toBeVisible();
  }
}