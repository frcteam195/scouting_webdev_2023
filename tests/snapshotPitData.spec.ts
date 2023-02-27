// @ts-check
import { test, expect } from '@playwright/test';

test('pit 166 length', async ({ page }) => {
  await page.goto('http://localhost:4200/#/');
  await page.getByText('Robot Snapshot', { exact:true }).click();
  await expect(page.getByText('General Info', { exact: true })).toBeVisible();
  await page.locator('#teamSelect').selectOption('166');
  await expect(page.getByText('Chop Shop')).toBeVisible();
  await expect(page.getByTestId('robotLength')).toContainText('12 in');
});