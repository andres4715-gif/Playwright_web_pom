import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Load the base URL from an environment variable if available, otherwise use the default URL
export const BASE_URL = process.env.BASE_URL || 'https://playwright.dev';
export const BASE_URL_API_TEST =
  process.env.BASE_URL_API_TEST || 'https://jsonplaceholder.typicode.com';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests', // Test directory
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // According machine resources
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html', // interactive report
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', // Record the trace for the first attempt of a fail tests

    /* Capture screenshots if this is failed */
    screenshot: 'only-on-failure',

    /* Capture a failed video */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api',
      use: {},
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Opcional: Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Optional: folder for test artifacts */
  // outputDir: 'test-results/',

  /* Optional: Run a local server before test execution */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
