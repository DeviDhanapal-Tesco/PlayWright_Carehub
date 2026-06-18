import { Page } from '@playwright/test';

export class BasePage {
  public page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  public async navigateTo(): Promise<void> {
    await this.page.goto('/');
  }
}
