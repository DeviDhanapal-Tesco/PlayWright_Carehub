import { type Page } from '@playwright/test';

export class BaseTest {
  constructor(protected page: Page) {}
}
