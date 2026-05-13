// ============================================================
// FILE: playwright.config.ts  (root of your project)
// PURPOSE: Central config — baseURL, browser, timeouts,
//          reporters. Change settings here, not in test files.
// ============================================================

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Where your tests live
  testDir: './amazon',

  // Run tests in parallel
  fullyParallel: false,

  // Retry once on CI, never locally
  retries: process.env.CI ? 1 : 0,

  // How many workers
  workers: 1,

  // Reports
  reporter: [['html'], ['list']],

  use: {
    // Base URL
    baseURL: process.env.BASE_URL ?? 'https://www.amazon.com',

    // Headless in CI, headed locally
    headless: process.env.CI ? true : false,

    // ── Bot detection fixes for CI ─────────────────────────
    // Pretend to be a real Chrome browser
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',

    // Real browser headers
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
    },

    // Real screen size
    viewport: { width: 1280, height: 720 },

    // Slow down in CI to avoid bot detection
    launchOptions: {
      slowMo: process.env.CI ? 500 : 0,
    },
    // ──────────────────────────────────────────────────────

    // Save screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Save video only when a test fails
    video: 'retain-on-failure',

    // Save trace on first retry
    trace: 'on-first-retry',

    // Max time for each action (click, fill, etc.)
    actionTimeout: 15_000,

    // Max time for page.goto()
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Override device user agent with our custom one
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    },
  ],
});