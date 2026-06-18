import { UITest } from '../../shared/types/tests/uiTest.type';
import { test as base } from '@playwright/test';
export type UIFixture = {
  uiTest: UITest;
};

export const test = base.extend<UIFixture>({
  uiTest: [async ({ page }, use) => {
    const uiTest = new UITest(page);
    await use(uiTest);
    await uiTest.afterTest();
  }, { auto: true }],
});
export { expect } from '@playwright/test';
