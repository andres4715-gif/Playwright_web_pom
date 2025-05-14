import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.signInButton = page.getByRole('button', { name: 'SIGN IN' });
    this.errorMessage = page.locator('#signInResultMessage');
    this.createAccountButton = page.getByRole('link', {
      name: 'CREATE NEW ACCOUNT',
    });
  }

  async login(username: string, password?: string): Promise<void> {
    await this.usernameInput.fill(username);
    if (password) {
      await this.passwordInput.fill(password);
    }
    await this.signInButton.click();
  }

  async openLoginModal(): Promise<void> {
    // await this.openUserMenu();
    await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorMessage.textContent();
    } catch (error) {
      console.log(
        'Error message element not found or not visible within timeout.'
      );
      return null;
    }
  }

  async navigateToRegistration(): Promise<void> {
    await this.createAccountButton.click();
    await this.page.waitForURL('**/register');
  }
}
