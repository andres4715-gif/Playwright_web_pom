import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  readonly visualstudio: Locator;
  readonly bing: Locator;
  readonly outlook: Locator;
  readonly hotStar: Locator;
  readonly materialUi: Locator;
  readonly ingBank: Locator;
  readonly adobe: Locator;
  readonly reactNavigation: Locator;
  readonly accessibilityInsights: Locator;
  readonly traceViewer: Locator;

  constructor(page: Page) {
    super(page); // Call the constructor of the BasePage class
    this.visualstudio = page.locator('[alt="VS Code"]');
    this.bing = page.locator('[alt="Bing"]');
    this.outlook = page.locator('[alt="Outlook"]');
    this.hotStar = page.locator('[alt="Disney+ Hotstar"]');
    this.materialUi = page.locator('[alt="Material UI"]');
    this.ingBank = page.locator('[alt="ING"]');
    this.adobe = page.locator('[alt="Adobe"]');
    this.reactNavigation = page.locator('[alt="React Navigation"]');
    this.accessibilityInsights = page.locator('[alt="Accessibility Insights"]');
    this.traceViewer = page.locator('a[href="docs/trace-viewer-intro"]');
  }

  async navigateToChosenByCompanies(
    categoryName:
      | 'visualstudio'
      | 'bing'
      | 'outlook'
      | 'hotStar'
      | 'materialUi'
      | 'ingBank'
      | 'adobe'
      | 'reactNavigation'
      | 'accessibilityInsights'
  ): Promise<void> {
    switch (categoryName) {
      case 'visualstudio':
        await this.click(this.visualstudio);
        break;
      case 'bing':
        await this.click(this.bing);
        break;
      case 'outlook':
        await this.click(this.outlook);
        break;
      case 'hotStar':
        await this.click(this.hotStar);
        break;
      case 'materialUi':
        await this.click(this.materialUi);
        break;
      case 'ingBank':
        await this.click(this.ingBank);
        break;
      case 'adobe':
        await this.click(this.adobe);
        break;
      case 'reactNavigation':
        await this.click(this.reactNavigation);
        break;
      case 'accessibilityInsights':
        await this.click(this.accessibilityInsights);
        break;
      default:
        throw new Error(`Category is not supported: ${categoryName}`);
    }
  }

  async gettingLinkText(): Promise<String> {
    return this.getText(this.traceViewer);
  }
}
