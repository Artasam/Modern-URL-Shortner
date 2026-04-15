import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // Assuming frontend runs on 5173
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Vite \+ React/);
});

test('can submit a url to shorten', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  
  // Find the input
  const input = page.locator('input[name="long_url"]');
  await input.fill('https://playwright.dev');

  // Submit
  await page.locator('button[type="submit"]').click();

  // Wait for the success UI element to appear
  await expect(page.getByText('Your shortened link:')).toBeVisible({ timeout: 5000 });
});
