import { BaseTest } from './baseTest.type';

export class UITest extends BaseTest {
  async afterTest(): Promise<void> {
    if (process.env.KEEP_BROWSER_OPEN?.toUpperCase() === 'TRUE') {
      await this.page.pause();
    }
  }
}
