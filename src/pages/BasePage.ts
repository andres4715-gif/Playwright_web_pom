import { type Page, type Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';

export class BasePage {
  readonly page: Page;
  readonly userMenu: Locator;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly cartIcon: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.userMenu = page.locator('#menuUserLink');
    this.searchIcon = page.locator('#searchLink');
    this.searchInput = page.locator('#autoComplete');
    this.cartIcon = page.locator('#shoppingCartLink');
    this.logo = page.locator('.logo a');
  }

  async goto(path: string = '/'): Promise<void> {
    const url = path.startsWith('http')
      ? path
      : `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
    await this.page.goto(url);
  }

  async openUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async clickCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async performSearch(searchTerm: string): Promise<void> {
    await this.searchIcon.click();
    // Wait for the search input to be visible
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForPageLoad(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }
}
