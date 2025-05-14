import { type Page, type Locator, expect } from '@playwright/test';
import { BASE_URL } from '../../playwright.config';


export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  /**
   * Browser to specific URL
   */
  async goto(path: string = '/'): Promise<void> {
    const url = path.startsWith('http')
      ? path
      : `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
    await this.page.goto(url);
  }

  /**
   *
   * Waits for the page to load according to the specified state
   */
  async waitForPageLoad(
    state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'
  ): Promise<void> {
    await this.page.waitForLoadState(state);
  }

  /**
   *
   * Obtains the title of the page
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   *
   * Clicks on an element
   */
  async click(locator: Locator): Promise<void> {
    await this.scrollToElement(locator);
    await locator.click();
  }

  /**
   *
   * Fill a text field
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   *
   * Press a key on an element
   */
  async pressKey(locator: Locator, key: string): Promise<void> {
    await locator.press(key);
  }

  /**
   *
   * Verify if an element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   *
   * Waits for an element to be visible
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   *
   * Obtains the text of an element
   */
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || '';
  }

  /**
   *
   * Selects an option from a dropdown
   */
  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption(value);
  }

  /**
   *
   * Waits for a specific time (use with caution, prefer explicit waits)
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   *
   * Scrolls to an element
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }
  /**
   *
   *
   * Checks if an element is enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   *
   * Checks if an element is checked
   */
  async isChecked(locator: Locator): Promise<boolean> {
    return await locator.isChecked();
  }
  /**
   *
   * Checks if an element is disabled
   */
  async isDisabled(locator: Locator): Promise<boolean> {
    return await locator.isDisabled();
  }
  /**
   *
   * Checks if an element is hidden
   */
  async isHidden(locator: Locator): Promise<boolean> {
    return await locator.isHidden();
  }
}
