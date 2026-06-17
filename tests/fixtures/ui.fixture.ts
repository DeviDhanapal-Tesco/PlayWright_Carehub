import { UITest } from '../../shared/types/tests/uiTest.type';
import { test as base } from '@playwright/test';
export type UIFixture = {
  uiTest: UITest;
};

export const test = base.extend<UIFixture>({
  uiTest: async ({ page }, use) => {
    await use(new UITest(page));
  },
});
export { expect } from '@playwright/test';
