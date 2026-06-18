import * as fs from 'fs';
import { Page } from '@playwright/test';
import { BaseController } from './base.controller';
import { LoginPage } from 'tests/pages/login.page';

type LoginCredentials = {
  teleSalesUserName: string;
  teleSalesPassword: string;
  inStoreUserName: string;
  inStorePassword: string;
};

export class LoginController extends BaseController {
  public readonly loginPage: LoginPage;
  private readonly credentials: LoginCredentials;

  constructor(page: Page, credentials: LoginCredentials) {
    super(page);
    this.loginPage = new LoginPage(page);
    this.credentials = credentials;
  }

  public async login(username: string, password: string): Promise<void> {
    await this.loginPage.input_userName.fill(username);
    await this.loginPage.input_password.fill(password);
    await this.loginPage.button_logIn.click();
    await this.page.waitForTimeout(60_000);
  }

  public async loginAsTeleSales(): Promise<void> {
    console.log(this.credentials);
    await this.login(this.credentials.teleSalesUserName, this.credentials.teleSalesPassword);
  }

  public async loginAsInStore(): Promise<void> {
    await this.login(this.credentials.inStoreUserName, this.credentials.inStorePassword);
  }
  public async loginAsInStoreWithCookies(): Promise<void> {
    const sessionFileMap: Record<string, string> = {
      INSTORE: './data/auth/instoreSession.json',
      TELESALES: './data/auth/telesalesSession.json',
    };
    const sessionType = process.env.SESSION_TYPE?.toUpperCase();
    if (!sessionType || !sessionFileMap[sessionType]) {
      throw new Error(
        `SESSION_TYPE must be 'INSTORE' or 'TELESALES', got: '${process.env.SESSION_TYPE}'`,
      );
    }

    const sessionFile = sessionFileMap[sessionType];

    const cookies = JSON.parse(fs.readFileSync(sessionFile, 'utf-8'));
    await this.page.context().addCookies(cookies);

    console.log(`Cookies loaded from ${sessionFile}`);
    await this.page.reload();
  }
}
