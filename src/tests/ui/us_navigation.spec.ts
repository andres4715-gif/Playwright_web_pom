import { test, expect } from '../../fixtures/pageFixtures';

test.describe.only('Companies Navigation @ui @us', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto('/');
    await homePage.waitForPageLoad('networkidle'); // wait for correct page loading
  });

  test('should navigate to specific visual studio Company', async ({
    page,
    homePage,
  }) => {
    await homePage.navigateToChosenByCompanies('visualstudio');
    console.log(`--- Working in this URL ${page.url()}`);
    expect(page.url()).toContain('playwright.dev');
    await expect(page.locator('[href="/community/welcome"]')).toHaveText(
      'Community'
    );
  });

  test('should navigate to specific bing Company', async ({
    page,
    homePage,
  }) => {
    await homePage.navigateToChosenByCompanies('bing');
    console.log(`--- Working in this URL ${page.url()}`);
    const data = await homePage.gettingLinkText();
    console.log(`--- Obtained link text ${data}`);
    expect(page.url()).toContain('playwright.dev');
    await expect(page.locator('a[href="docs/trace-viewer-intro"]')).toHaveText(
      'Trace Viewer.'
    );
  });
});
