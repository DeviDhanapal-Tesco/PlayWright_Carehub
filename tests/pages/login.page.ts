import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  public get input_userName(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }
  public get input_password(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }
  public get button_logIn(): Locator {
    return this.page.getByRole('button', { name: 'Log In to Sandbox' });
  }
  constructor(page: Page) {
    super(page);
  }

  public override async navigateTo(): Promise<void> {
    await this.page.goto('/lightning/page/home');
  }
}
