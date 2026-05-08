// ============================================================
// FILE: amazon/pages/locators/SignupLocators.ts
// PURPOSE: Real Amazon selectors captured via Playwright codegen
//          NO actions, NO logic — just selector strings
// USED BY: pages/SignupPage.ts
// ============================================================

export const SignupLocators = {

  // ── Step 1: Homepage — Account menu ───────────────────────
  accountMenuLink:      'Hello, sign in Account & Lists',

  // ── Step 2: Email input screen ────────────────────────────
  emailOrMobileInput:   'Enter mobile number or email',
  continueButton:       'Continue',

  // ── Step 3: Proceed to create account ────────────────────
  proceedToCreateBtn:   'Proceed to create an account',

  // ── Step 4: Registration form ─────────────────────────────
  nameInput:            'Your name',
  passwordInput:        'Password (at least 6',
  confirmPasswordInput: 'Re-enter password',
//--Short Password
  passwordTooShortError: '#auth-password-invalid-password-alert',


  // ── Step 5: Final submit ──────────────────────────────────
  submitButton:         'Continue Verify mobile number',

  // ── Validation errors (CSS — not role based) ──────────────
  nameEmptyError:       'Enter your name',
  emailError:           '#email-missing',
  passwordError:        '#password-missing',
  passwordMismatchError: 'Passwords must match',
  alertError:           '.a-alert-content',

} as const;