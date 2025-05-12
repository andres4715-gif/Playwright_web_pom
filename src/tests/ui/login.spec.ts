import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Login Functionality @ui', () => {
  test.beforeEach(async ({ homePage }) => {
    // Browser to main page before each login test
    await homePage.goto('/');
  });

  test('should allow user to login with valid credentials', async ({
    page,
    loginPage,
    homePage,
  }) => {
    await loginPage.openLoginModal();
    // Replace if you have a test account
    await loginPage.login('testuser_valid', 'Password123');

    await expect(homePage.userMenu.locator('span')).toHaveText(
      'testuser_valid',
      { timeout: 10000 }
    );
  });

  test('should show error message for invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.openLoginModal();
    await loginPage.login('invalidUser', 'wrongPassword');

    // Check the error message is displayed
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Incorrect user name or password.');
  });

  test('should show error message if password is not provided', async ({
    loginPage,
  }) => {
    await loginPage.openLoginModal();
    await loginPage.login('someuser');

    // Verify that an error message appears or the expected behavior occurs
    const errorMessage = await loginPage.getErrorMessage();
    // The message could vary, adjust according to what you observed
    expect(errorMessage).toContain('Incorrect user name or password.'); // Check the error message
  });
});
