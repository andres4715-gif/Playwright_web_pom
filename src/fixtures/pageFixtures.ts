import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage'; // Be sure to create this file
import { BasePage } from '../pages/BasePage';

// Define el tipo para tus fixtures
type MyFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
};

// Extends 'test' base from Playwright with your features
export const test = baseTest.extend<MyFixtures>({
  // Fixture for HomePage: this is  initialized  automatically
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // Fixture for LoginPage
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Fixture for RegistrationPage
  registrationPage: async ({ page }, use) => {
    // Be sures the class RegistrationPage exists and is implemented
    // await use(new RegistrationPage(page));
    await use(new BasePage(page) as any); // Usa BasePage como placeholder temporal
  },
});

// Re-export 'expect' to use it in your tests
export { expect } from '@playwright/test';
