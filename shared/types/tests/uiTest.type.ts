import * as fs from 'fs';
import { BaseTest } from './baseTest.type';

export class UITest extends BaseTest {
  async afterTest(): Promise<void> {
    const sessionType = process.env.SESSION_TYPE?.toUpperCase();
    const sessionFileMap: Record<string, string> = {
      INSTORE: 'instoreSession.json',
      TELESALES: 'telesalesSession.json',
    };
    const fileName = sessionType ? sessionFileMap[sessionType] : undefined;
    if (fileName) {
      const cookies = await this.page.context().cookies();
      console.log(`Storing session details to ${fileName}...`);
      fs.mkdirSync('./data/auth', { recursive: true });
      fs.writeFileSync(`./data/auth/${fileName}`, JSON.stringify(cookies, null, 2));
    }

    if (process.env.KEEP_BROWSER_OPEN?.toUpperCase() === 'TRUE') {
      await this.page.pause();
    }
  }
}
