import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Category Navigation @ui', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto('/');
    await homePage.waitForPageLoad('networkidle'); // wait for correct page loading
  });

  test('should navigate to Speakers category', async ({ page, homePage }) => {
    await homePage.navigateToCategory('speakers');
    // Verify that the URL changed or that a specific category element is visible
    await expect(page).toHaveURL(/.*\/category\/Speakers\/.*/);
    // or check a specific title or element
    await expect(page.locator('h3.categoryTitle')).toHaveText('SPEAKERS');
  });

  test('should navigate to Laptops category', async ({ page, homePage }) => {
    await homePage.navigateToCategory('laptops');
    await expect(page).toHaveURL(/.*\/category\/Laptops\/.*/);
    await expect(page.locator('h3.categoryTitle')).toHaveText('LAPTOPS');
  });
});
