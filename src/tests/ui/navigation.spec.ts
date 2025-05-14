import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Companies Navigation @ui', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto('/');
    await homePage.waitForPageLoad('networkidle'); // wait for correct page loading
  });

  test.only('should navigate to specific Company', async ({
    page,
    homePage,
  }) => {
    await homePage.navigateToChosenByCompanies('visualstudio');
    // await page.waitForURL('https://code.visualstudio.com/');
    // Verify that the URL changed or that a specific category element is visible

    console.log('✅✅✅', page.url());
    // expect(page.url()).toContain('visualstudio');
    // or check a specific title or element
    // await expect(page.locator('h3.categoryTitle')).toHaveText('SPEAKERS');
  });

  test('should navigate to Laptops category', async ({ page, homePage }) => {
    await homePage.navigateToChosenByCompanies('bing');
    await expect(page).toHaveURL(/.*\/category\/Laptops\/.*/);
    await expect(page.locator('h3.categoryTitle')).toHaveText('LAPTOPS');
  });
});
