import { test, expect } from '../../fixtures/pageFixtures';

test.describe('Shopping Cart Functionality @ui', () => {
  test('should add a product to the cart from product page', async ({
    page /*, productPage, cartPage */,
  }) => {
    // 1. Browsing to a category (ej. Laptops)
    // await homePage.navigateToCategory('laptops');

    // 2. Click on a product (ej. HP ELITEPAD 1000 G2 TABLET)
    await page.goto('/#/product/3');
    await page.waitForLoadState('networkidle');

    // 3. (In ProductPage) Click on "ADD TO CART"
    const addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();

    // 4. Optional: Check that the cart icon updates or a message appears
    // await expect(homePage.cartIcon.locator('.itemsInCart')).toHaveText('1'); // Check the locator is correct

    // 5. Go to the cart (using homePage.clickCart() or a method in CartPage)
    await page.locator('#shoppingCartLink').click(); // Usando selector directo por simplicidad aquí
    await page.waitForURL('**/shoppingCart');

    // Check the product is in the cart
    // I need the  locators in CartPage
    await expect(page.locator('table#shoppingCart > tbody > tr')).toHaveCount(
      1
    ); // Assume a table with rows and product details
    await expect(
      page.getByRole('cell', { name: 'HP ELITEPAD 1000 G2 TABLET' })
    ).toBeVisible();
  });
});
