import { test, expect, request } from '@playwright/test';
import { BASE_URL_API_TEST } from '../../../../playwright.config';

const POSTS_SERVICE_URL = `${BASE_URL_API_TEST}/posts`;
const COMMENT_SERVICE_URL = `${BASE_URL_API_TEST}/comments`;
const PHOTOS_SERVICE_URL = `${BASE_URL_API_TEST}/photos`;

test.describe('Posts API Tests @api', () => {
  test('POST posts - should Run with valid body', async ({ request }) => {
    const response = await request.post(`${POSTS_SERVICE_URL}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      data: {
        userId: 1,
        title: 'Andres Rios test',
        body: 'I am sending this body',
      },
    });

    expect(response.status()).toBe(201);
  });
});

test.describe('Account API Tests', () => {
  test('GET posts - should retrieve list of posts @api', async ({
    request,
  }) => {
    const response = await request.get(`${POSTS_SERVICE_URL}`);
    expect(response.ok()).toBeTruthy(); // Verify the status code is 2xx
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true); // The answer should be an array
    expect(body.length).toBeGreaterThan(0); // wait for at least one category
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('userId');

    // Printing all the titles of the posts
    // NOTE: This is just for demonstration purposes. In a real test, you would not print all titles.
    // You would typically assert specific values instead.
    let titles;
    for (let key in body) {
      titles = body[key];
      console.log(titles.title);
    }
  });

  test('GET comments/{id} - should retrieve a specific comment @api', async ({
    request,
  }) => {
    const commentId = 1; // ID is a product known
    const response = await request.get(`${COMMENT_SERVICE_URL}/${commentId}`);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    console.log(body);
    expect(body).toHaveProperty('postId');
    expect(body).toHaveProperty('email', 'Eliseo@gardner.biz'); // Verify the name of the product
    expect(body).toHaveProperty('name');
  });

  test('GET photos/{id} - should return 404 for non-existent photos @api', async ({
    request,
  }) => {
    const nonExistentProductId = 999999;
    const response = await request.get(
      `${PHOTOS_SERVICE_URL}/${nonExistentProductId}`
    );
    console.log('--- Response: ', await response.json());
    expect(response.status()).toBe(404); // Not Found
  });
});
