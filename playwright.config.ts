import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  outputDir: './trace',
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['./shared/support/reporter.support.ts'],
    ['html', { outputFolder: './reports', open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false,
        labels: [
          { pattern: [/@smoke/], label: { name: 'tag', value: 'smoke' } },
          { pattern: [/@regression/], label: { name: 'tag', value: 'regression' } },
          { pattern: [/@wip/], label: { name: 'tag', value: 'wip' } },
        ],
        environmentInfo: {
          framework: 'Playwright',
          environment: process.env.ENV ?? 'local',
        },
      },
    ],
  ],

  use: {
    baseURL: 'https://tmservice--uat.sandbox.lightning.force.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on',
  },

  projects: [
    {
      name: 'local-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'local-firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'local-webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
            JSON.stringify({
              browser: 'chrome',
              browser_version: 'latest',
              os: 'OS X',
              os_version: 'Sonoma',
              'browserstack.username': process.env.BROWSERSTACK_USERNAME,
              'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
              build: process.env.BROWSERSTACK_BUILD,
              project: 'Playwright-POC',
              'browserstack.idleTimeout': 300,
            }),
          )}`,
        },
      },
    },
  ],
});
