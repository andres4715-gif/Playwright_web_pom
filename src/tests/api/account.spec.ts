import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../../playwright.config';

const ACCOUNT_SERVICE_URL = `${BASE_URL}/accountservice`;
const CATALOG_API_URL = `${BASE_URL}/catalog/api/v1`;

test.describe('Account API Tests @api', () => {
  test('POST /account/login - should fail with invalid credentials', async ({
    request,
  }) => {
    const response = await request.post(
      `${ACCOUNT_SERVICE_URL}/account/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          loginUser: `testuser${Date.now()}`, // invalid user
          loginPassword: 'InvalidPassword',
          // The real API may require more fields or a different format
        },
      }
    );

    // Verify that the response was NOT successful (e.g. 401 Unauthorized or similar)
    expect(response.status()).toBe(401);
    const body = await response.json();
    // Verify the message structure of the error in the response
    expect(body).toHaveProperty('reason', 'Incorrect user name or password.');
  });

  test('POST /account/register - should reject registration with existing username', async ({
    request,
  }) => {
    const existingUsername = 'test_user_exists';

    const response = await request.post(
      `${ACCOUNT_SERVICE_URL}/account/register`,
      {
        headers: { 'Content-Type': 'application/json' },
        data: {
          // Minimum data required by the registration API
          accountType: 'USER',
          allowOffersPromotion: true,
          cityName: 'Test City',
          country: 'us',
          email: `test-${Date.now()}@example.com`,
          firstName: 'Test',
          lastName: 'User',
          loginName: existingUsername,
          password: 'Password123',
          confirmPassword: 'Password123',
          phoneNumber: '1234567890',
          stateProvince: 'Test State',
          address: '123 Test St',
          zipcode: '12345',
        },
      }
    );

    expect(response.status()).toBe(409); // 409 Conflict  is common for existing users
    const body = await response.json();
    expect(body).toHaveProperty(
      'reason',
      expect.stringContaining('already exists')
    );
  });

  // NOTE: To test POST/PUT/DELETE to modify user data, you may need to:
  // 1. Create test data before the test (e.g. a test user).
  // 2. Clean up the test data after the test (in a `test.afterEach`).
  // 3. Use specific users/data for API tests.
});

test.describe('Catalog API Tests @api', () => {
  test('GET /catalog/api/v1/categories - should retrieve list of categories', async ({
    request,
  }) => {
    const response = await request.get(`${CATALOG_API_URL}/categories`);

    expect(response.ok()).toBeTruthy(); // Verify the status code is 2xx
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true); // The answer should be an array
    expect(body.length).toBeGreaterThan(0); // wait for at least one category
    expect(body[0]).toHaveProperty('categoryId');
    expect(body[0]).toHaveProperty('categoryName');
  });

  test('GET /catalog/api/v1/products/{id} - should retrieve a specific product', async ({
    request,
  }) => {
    const productId = 3; // ID is a product known
    const response = await request.get(
      `<span class="math-inline">\{CATALOG\_API\_URL\}/products/</span>{productId}`
    );

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('productId', productId);
    expect(body).toHaveProperty('productName', 'HP ElitePad 1000 G2 Tablet'); // Verify the name of the product
    expect(body).toHaveProperty('price');
  });

  test('GET /catalog/api/v1/products/{id} - should return 404 for non-existent product', async ({
    request,
  }) => {
    const nonExistentProductId = 999999;
    const response = await request.get(
      `<span class="math-inline">\{CATALOG\_API\_URL\}/products/</span>{nonExistentProductId}`
    );

    expect(response.status()).toBe(404); // Not Found
  });
});
