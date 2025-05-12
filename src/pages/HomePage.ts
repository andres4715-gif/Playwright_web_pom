import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  readonly speakersCategory: Locator;
  readonly tabletsCategory: Locator;
  readonly laptopsCategory: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of the BasePage class
    this.speakersCategory = page.locator('#speakersImg');
    this.tabletsCategory = page.locator('#tabletsImg');
    this.laptopsCategory = page.locator('#laptopsImg');
  }

  async navigateToCategory(
    categoryName: 'speakers' | 'tablets' | 'laptops'
  ): Promise<void> {
    switch (categoryName) {
      case 'speakers':
        await this.speakersCategory.click();
        break;
      case 'tablets':
        await this.tabletsCategory.click();
        break;
      case 'laptops':
        await this.laptopsCategory.click();
        break;
      default:
        throw new Error(`Category is not supported: ${categoryName}`);
    }
    // await this.page.waitForURL(new RegExp(`\/${categoryName.toUpperCase()}\/`));
  }
}
