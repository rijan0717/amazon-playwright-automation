// ============================================================
// FILE: playwright.config.ts  (root of your project)
// PURPOSE: Central config — baseURL, browser, timeouts,
//          reporters. Change settings here, not in test files.
// ============================================================

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config(); // loads your .env file automatically

export default defineConfig({

  // Where your tests live
  testDir: './amazon',

  // Run tests in parallel
  fullyParallel: false,

  // Retry once on CI, never locally
  retries: process.env.CI ? 1 : 0,

  // How many workers (parallel browsers)
  workers: 1,

  // Reports — opens HTML report after run
  reporter: [['html'], ['list']],

  use: {
    // Base URL — so you can write goto('/ap/signin') instead of full URL
    baseURL: process.env.BASE_URL ?? 'https://www.amazon.com',

    // See the browser open while learning
    headless: process.env.CI ? true : false,


    // Save screenshot only when a test fails
    screenshot: 'only-on-failure',

    // Save video only when a test fails
    video: 'retain-on-failure',

    // Save trace on first retry (for debugging in CI)
    trace: 'on-first-retry',

    // Max time for each action (click, fill, etc.)
    actionTimeout: 15_000,

    // Max time for page.goto()
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});