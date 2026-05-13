// ============================================================
// FILE: amazon/auth/login.spec.ts
// PURPOSE: All test cases for Amazon LOGIN
//
// REAL FLOW:
//   Homepage → Account menu → Enter email → Continue
//   → Enter password → Sign in
// ============================================================

import { test, expect } from '@playwright/test';
import { LoginPage }    from '../pages/LoginPage';

test.describe('Amazon Login', () => {

  // Go to homepage before each test
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── Happy path ────────────────────────────────────────────

  test('TC_LOGIN_01: valid login navigates away from signin page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickAccountMenu();
    await loginPage.enterEmailAndContinue(
      process.env.TEST_EMAIL ?? ''
    );
    await loginPage.enterPasswordAndSignIn(
      process.env.TEST_PASSWORD ?? ''
    );

    // After login URL should not be signin page
    await expect(page).not.toHaveURL(/ap\/signin/);
  });

  // ── Negative: Empty email ─────────────────────────────────

  test('TC_LOGIN_02: shows error when email is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickAccountMenu();

    // Click Continue without entering anything
    await page
      .getByRole('button', { name: 'Continue' })
      .click();

    await loginPage.expectEmptyEmailError();
  });

  // ── Negative: Invalid email format ────────────────────────

  test('TC_LOGIN_03: shows error for invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickAccountMenu();
    await loginPage.enterEmailAndContinue('asdsds'); // not a valid email

    await loginPage.expectInvalidEmailError();
  });

  // ── Negative: Email not registered ───────────────────────

   test('TC_LOGIN_04: shows new user prompt for unregistered email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickAccountMenu();
    await loginPage.enterEmailAndContinue('notexist_xyz123@fake.com');

     await loginPage.expectNoAccountError();
});
  

  // ── Negative: Wrong password ──────────────────────────────

  test('TC_LOGIN_05: shows error for incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickAccountMenu();
    await loginPage.enterEmailAndContinue('rijan@gmail.com');
    await loginPage.enterPasswordAndSignIn('Password@123');
    await

    await loginPage.expectIncorrectPasswordError();
  });

});