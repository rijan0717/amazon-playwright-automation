// ============================================================
// FILE: amazon/auth/signup.spec.ts
// ============================================================

import { test, expect }    from '@playwright/test';
import { SignupPage }       from '../pages/SignupPage';
import { generateUniqueEmail,
         generatePassword } from '../utils/helpers';

test.describe('Amazon Signup', () => {

  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
  });

  // ── Happy path ────────────────────────────────────────────

  test('TC_SIGNUP_01: clicking account menu opens signin page', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.clickAccountMenu();

    await expect(
      page.getByRole('textbox', { name: 'Enter mobile number or email' })
    ).toBeVisible();
  });

  test('TC_SIGNUP_02: entering new email shows Proceed to create account', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email      = generateUniqueEmail();

    await signupPage.clickAccountMenu();
    await signupPage.enterEmailAndContinue(email);

    await expect(
      page.getByRole('button', { name: 'Proceed to create an account' })
    ).toBeVisible();
  });

  test('TC_SIGNUP_03: registration form is visible after proceeding', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email      = generateUniqueEmail();

    await signupPage.clickAccountMenu();
    await signupPage.enterEmailAndContinue(email);
    await signupPage.clickProceedToCreateAccount();

    await signupPage.expectRegistrationFormVisible();
  });

  test('TC_SIGNUP_04: user can complete full signup form', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email      = generateUniqueEmail();
    const password   = generatePassword();

    await signupPage.registerUser('Test User', email, password);

    // Amazon shows OTP / verification page on success
    await expect(page).toHaveURL(/ap\/(cvf|mfa|accountholder|signin)/);
  });

  // ── Validation ────────────────────────────────────────────

  test('TC_SIGNUP_05: shows error when name is empty', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email      = generateUniqueEmail();
    const password   = generatePassword();

    await signupPage.clickAccountMenu();
    await signupPage.enterEmailAndContinue(email);
    await signupPage.clickProceedToCreateAccount();
    // skip name
    await signupPage.fillPassword(password);
    await signupPage.fillConfirmPassword(password);
    await signupPage.clickContinue();

    await signupPage.expectNameError();
  });

  test('TC_SIGNUP_06: shows error when passwords do not match', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email      = generateUniqueEmail();

    await signupPage.clickAccountMenu();
    await signupPage.enterEmailAndContinue(email);
    await signupPage.clickProceedToCreateAccount();
    await signupPage.fillName('Test User');
    await signupPage.fillPassword('Password@123');
    await signupPage.fillConfirmPassword('Different@999'); // mismatch
    await signupPage.clickContinue();

    await signupPage.expectPasswordMismatchError();
  });

  test('TC_SIGNUP_07: shows error for short password (less than 6 chars)', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const email      = generateUniqueEmail();

    await signupPage.clickAccountMenu();
    await signupPage.enterEmailAndContinue(email);
    await signupPage.clickProceedToCreateAccount();
    await signupPage.fillName('Test User');
    await signupPage.fillPassword('abc');        // 3 chars — too short
    await signupPage.fillConfirmPassword('abc');
    await signupPage.clickContinue();

    // Uses real selector: #auth-password-invalid-password-alert
    await signupPage.expectPasswordTooShortError();
  });

  test('TC_SIGNUP_08: existing email shows password screen not signup', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.clickAccountMenu();
    await signupPage.enterEmailAndContinue(
      process.env.TEST_EMAIL ?? 'rijan@gmail.com'
    );

    // Existing account → shows password field, not "Proceed to create"
    await expect(
      page.getByRole('textbox', { name: /password/i })
    ).toBeVisible();
  });

});