import { test } from '../fixtures/login.fixture';
import { epic, feature, story } from 'allure-js-commons';

test.describe('Login', () => {
  test('Login with InStore session', { tag: ['@wip'] }, async ({ loginController }) => {
    process.env.SESSION_TYPE = 'INSTORE';

    await test.step('Allure Report Settings', async () => {
      await epic('Instore');
      await feature('Login');
      await story('Login');
    });

    await test.step('Navigate to InStore with stored Cookies', async () => {
      await loginController.loginPage.navigateTo();
      await loginController.loginAsInStoreWithCookies();
    });
  });
});
