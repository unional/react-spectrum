import {expect, test} from '@playwright/test';

test('should open and close', async ({page}) => {
  await page.goto('http://localhost:9003/iframe.html?id=dialogcontainer--default');
  await expect(page.getByRole('button', {name: 'Open dialog'})).toBeVisible();
  await page.getByRole('button', {name: 'Open dialog'}).click();
  await expect(page.getByTestId('underlay')).toBeVisible();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', {name: 'Open dialog'})).not.toBeVisible();
  await expect(page.getByRole('heading', {name: 'The Heading'})).toBeVisible();
  await expect(page.getByText('The Header')).toBeVisible();
  await expect(page.getByText('Lorem ipsum dolor sit amet,')).toBeVisible();
  await expect(page.getByRole('button', {name: 'Cancel'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Confirm'})).toBeVisible();
  await page.getByRole('button', {name: 'Confirm'}).click();
  await expect(page.getByTestId('underlay')).not.toBeVisible();
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

