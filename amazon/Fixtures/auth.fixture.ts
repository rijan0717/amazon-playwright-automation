// ============================================================
// FILE: amazon/Fixtures/auth.fixture.ts
// PURPOSE: Reusable logged-in session.
//          Import { test, expect } from THIS file in spec files
//          that need a logged-in user — never repeat login code.
// ============================================================

import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testUser } from '../test-data/users';

// Define the fixture type
type AuthFixtures = {
  loggedIn: void; // sets up login before each test, no value returned
};

export const test = base.extend<AuthFixtures>({

  loggedIn: async ({ page }, use) => {
    // ── SETUP: runs before your test ─────────────────────────
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testUser.email, testUser.password);
    await loginPage.expectLoginSuccess();

    // ── HAND OVER to the test ─────────────────────────────────
    await use();

    // ── TEARDOWN: runs after your test (optional cleanup) ─────
    // Nothing needed here — Playwright resets browser per test
  },

});

// Re-export expect so spec files only need one import
export { expect };