import { test as base } from './ui.fixture';
import { LoginController } from 'tests/controllers/login.controller';
import { Environment } from 'shared/config/environment.config';

export type LoginFixture = {
  loginController: LoginController;
};

export const test = base.extend<LoginFixture>({
  loginController: async ({ page }, use) => {
    await use(
      new LoginController(page, {
        teleSalesUserName: Environment.careHubTeleSalesUserName,
        teleSalesPassword: Environment.careHubTeleSalesPassword,
        inStoreUserName: Environment.careHubInStoreUserName,
        inStorePassword: Environment.careHubInStorePassword,
      }),
    );
  },
});
export { expect } from '@playwright/test';
