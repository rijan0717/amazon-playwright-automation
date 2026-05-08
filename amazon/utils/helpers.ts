// ============================================================
// FILE: amazon/utils/helpers.ts
// PURPOSE: Shared utility functions used across all spec files.
//          Not tied to any specific page.
// ============================================================

import { Page } from '@playwright/test';

// Generate a unique email for each signup test run
// Example output: testuser_1714901234567@mailinator.com
export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  return `testuser_${timestamp}@mailinator.com`;
}

// Generate a strong random password
export function generatePassword(length = 12): string {
  return `Test@${Math.random().toString(36).slice(2, length)}1`;
}

// Wait for a toast / alert message to appear then disappear
export async function waitForToast(page: Page, text: string) {
  const toast = page.getByText(text);
  await toast.waitFor({ state: 'visible', timeout: 5000 });
  await toast.waitFor({ state: 'hidden',  timeout: 5000 });
}

// Scroll element into view before interacting
export async function scrollToElement(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

// Take a named screenshot (useful for debugging)
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
}