import { recordEvidence } from '../helpers/step-evidence';
import type { Locator, Page } from '@playwright/test';

export class StandardLicenseConfigurationsPage {
  readonly page: Page;

  // Page shell
  readonly heading: Locator;
  readonly pageSubheading: Locator;
  readonly configurationCountText: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // Card collection
  readonly cardContainer: Locator;
  readonly configurationCards: Locator;

  // Card structure — constructed with product name to scope
  readonly cardByName: (name: string) => Locator;
  readonly cardProductName: (card: Locator) => Locator;
  readonly cardRoleBadge: (card: Locator) => Locator;
  readonly cardLicensesValue: (card: Locator) => Locator;
  readonly cardMaintenanceValue: (card: Locator) => Locator;
  readonly cardExpirationValue: (card: Locator) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole('heading', { name: 'Standard License Configurations', level: 1 });
    this.pageSubheading = page.getByRole('heading', { name: 'Standard License Configurations', level: 2 });
    this.configurationCountText = page.locator('text=/\\d+ configurations/');
    this.mainContent = page.locator('main');
    this.footer = page.locator('footer');

    this.cardContainer = page.locator('main > div').last();
    this.configurationCards = this.cardContainer.locator('> div');

    this.cardByName = (name: string) =>
      this.cardContainer.locator('> div').filter({ has: page.getByText(name, { exact: true }) }).first();

    this.cardProductName = (card: Locator) => card.locator('> div:first-child p:first-child');
    this.cardRoleBadge = (card: Locator) => card.locator('> div:first-child p:nth-child(2)');
    this.cardLicensesValue = (card: Locator) =>
      card.locator('text=Licenses').locator('..').locator('p:last-child');
    this.cardMaintenanceValue = (card: Locator) =>
      card.locator('text=Maintenance').locator('..').locator('p:last-child');
    this.cardExpirationValue = (card: Locator) =>
      card.locator('text=Expiration').locator('..').locator('p:last-child');
  }

  async navigate(): Promise<void> {
    await recordEvidence('action-goto-standard-license-configurations.page-51', async () => this.page.goto('/standard-license-configurations'));
    await this.heading.waitFor({ state: 'visible' });
  }

  async getConfigurationCount(): Promise<number> {
    const text = await this.configurationCountText.textContent();
    if (!text) return 0;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async getVisibleCardCount(): Promise<number> {
    return this.configurationCards.count();
  }

  async getCardTitles(): Promise<string[]> {
    const count = await this.getVisibleCardCount();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      const card = this.configurationCards.nth(i);
      const name = await card.locator('p').first().textContent();
      if (name) titles.push(name.trim());
    }
    return titles;
  }

  async getLicensesValue(card: Locator): Promise<number> {
    const text = await this.cardLicensesValue(card).textContent();
    return text ? parseInt(text, 10) : 0;
  }

  async getRolesForCard(card: Locator): Promise<string[]> {
    const roles: string[] = [];
    const roleElements = card.locator('> div:first-child p:not(:first-child)');
    const count = await roleElements.count();
    for (let i = 0; i < count; i++) {
      const role = await roleElements.nth(i).textContent();
      if (role) roles.push(role.trim());
    }
    return roles;
  }
}