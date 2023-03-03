import { test, expect } from '@playwright/test';

test('has welcome title', async ({ page }) => {
  await page.goto('http://localhost:4200/#/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("CyberScouter");
});

test('Mobile Version Check', async ({ page }) => {
  await page.goto('http://localhost:4200/#/');

  // Click the get started link.
  await expect(page.getByText('Mobile Version', { exact: true })).toBeVisible();
});
