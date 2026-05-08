// ============================================================
// FILE: amazon/pages/locators/LoginLocators.ts
// PURPOSE: Real Amazon login selectors from Playwright codegen
//          NO actions, NO logic — just selector strings
// USED BY: pages/LoginPage.ts
// ============================================================

export const LoginLocators = {

  // ── Step 1: Homepage account menu ─────────────────────────
  accountMenuLink:    'Hello, sign in Account & Lists',

  // ── Step 2: Email input screen ────────────────────────────
  emailOrMobileInput: 'Enter mobile number or email',
  continueButton:     'Continue',

  // ── Step 3: Password screen ───────────────────────────────
  passwordInput:      'Password',
  signInButton:       'Sign in',

  // ── Validation errors ─────────────────────────────────────
  emptyEmailError:    'Enter your email or mobile number',
  invalidEmailError:  'Invalid email address',
  incorrectPassError: 'Your password is incorrect',
  noAccountError:     'We cannot find an account with that email address',

  // ── After successful login ────────────────────────────────
  accountGreeting:    '#nav-link-accountList-nav-line-1',

} as const;