import { test } from '../fixtures/login.fixture';
import { epic, feature, story } from 'allure-js-commons';

test.describe('Session', () => {
  test(
    'Generate Session with InStore credentials',
    { tag: ['@session', '@wip'] },
    async ({ loginController }) => {
      process.env.SESSION_TYPE = 'INSTORE';

      await test.step('Allure Report Settings', async () => {
        await epic('Instore');
        await feature('Session');
        await story('Session Generation');
      });

      await test.step('Navigate to InStore Login Page', async () => {
        await loginController.loginPage.navigateTo();
        await loginController.loginAsInStore();
      });
    },
  );

  test(
    'Generate Session with Telesales credentials',
    { tag: ['@session', '@wip'] },
    async ({ loginController }) => {
      process.env.SESSION_TYPE = 'TELESALES';

      await test.step('Allure Report Settings', async () => {
        await epic('Telesales');
        await feature('Session');
        await story('Session Generation');
      });

      await test.step('Navigate to Telesales Login Page', async () => {
        await loginController.loginPage.navigateTo();
        await loginController.loginAsTeleSales();
      });
    },
  );
});
