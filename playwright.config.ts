import { defineConfig, devices } from '@playwright/test';

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
    reporter: [
        ['list'], // Terminal output
        [
            'allure-playwright',
            {
                resultsDir: 'allure-results', // Directorio donde se guardan los resultados
                detail: true,
                outputFolder: 'allure-report', // Directorio del reporte final
                suiteTitle: false, // Opcional: personalizar títulos
            },
        ],
        // Mantener HTML como backup
        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never',
            },
        ],
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    headless: true,
    baseURL: BASE_URL,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry', // Record the trace for the first attempt of a fail tests

    /* Capture screenshots if this is failed */
    screenshot: 'only-on-failure',

    /* Capture a failed video */
    video: 'retain-on-failure',

    /*Other setup */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'api',
      use: {},
    },
    {
      name: 'API_Tests',
      testMatch: /.*\.spec\.ts/
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
  ],
});
