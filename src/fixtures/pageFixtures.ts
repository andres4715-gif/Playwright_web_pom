import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Define the fixture type
type MyFixtures = {
  homePage: HomePage;
};

// Extends 'test' base from Playwright with your features
export const test = baseTest.extend<MyFixtures>({
  // Fixture for HomePage: this is  initialized  automatically
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

// Re-export 'expect' to use it in your tests
export { expect } from '@playwright/test';
