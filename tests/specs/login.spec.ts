import { test, expect } from '../fixtures/ui.fixture';
import * as AllureReport from '../../shared/utils/reporter.utils';
import { label, epic, feature, story, tag } from 'allure-js-commons';

test.describe('Google Search', () => {
  test('Test1', { tag: '@wip' }, async ({ page }) => {
    await epic('Search');
    await feature('Google UK');
    await story('Playwright Docs');

    await test.step('Navigate to Google', async () => {
      await page.goto('https://www.google.co.uk');
      await AllureReport.logStep('Navigated to Google');
    });

    await test.step('Accept cookies', async () => {
      await page.getByRole('button', { name: 'Accept all' }).click();
      await AllureReport.logStep('Accepted cookies');
    });

    await test.step('Search for Playwright Docs', async () => {
      await page.getByRole('combobox', { name: 'Search' }).fill('Playwright Doc');
      await page.keyboard.press('Enter');
      await AllureReport.logStep('Searched for Playwright Docs');
    });
  });

  test('Test2', { tag: '@wip' }, async ({ page }) => {
    await epic('Search');
    await feature('Google UK');
    await story('Playwright Docs');

    await test.step('Navigate to Google', async () => {
      await page.goto('https://www.google.co.uk');
      await AllureReport.logStep('Navigated to Google');
    });

    await test.step('Accept cookies', async () => {
      await page.getByRole('button', { name: 'Accept all' }).click();
      await AllureReport.logStep('Accepted cookies');
    });

    await test.step('Search for Playwright Docs', async () => {
      await page.getByRole('combobox', { name: 'Search' }).fill('Playwright Doc');
      await page.keyboard.press('Enter');
      await AllureReport.logStep('Searched for Playwright Docs');
    });
  });
});
