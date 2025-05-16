import { test, expect, request } from '@playwright/test';

test.describe('Posts API Tests', () => {
  test('GET Request to an API @api', async ({}) => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    expect(response.ok()).toBeTruthy();
    console.log(`--- This is the response ✅`);

    const responseBody = await response.json();
    console.log(responseBody);
  });
});
