import { Page } from '@playwright/test';
import { AuthenticationFlow } from './authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

export class LicenseRequestHistoryFlow {
  private auth: AuthenticationFlow;
  private dashboard: SystemUserDashboardPage;

  constructor(page: Page) {
    this.auth = new AuthenticationFlow(page);
    this.dashboard = new SystemUserDashboardPage(page);
  }

  async ensureOnDashboard(profileName: string): Promise<void> {
    await this.auth.ensureAuthenticated(profileName);
    await this.dashboard.waitForFullRender();
  }

  async enableHistory(): Promise<void> {
    await this.dashboard.enableHistory();
  }

  async waitForInitialHistoryLoad(): Promise<void> {
    await this.dashboard.waitForInitialHistoryLoad();
  }

  async getLoadedCount(): Promise<number> {
    return this.dashboard.getLoadedCount();
  }

  async getTotalProcessedCount(): Promise<number> {
    return this.dashboard.getTotalProcessedCount();
  }

  // Batch 5B — Search
  async searchHistory(query: string): Promise<void> {
    await this.dashboard.searchHistory(query);
  }

  async clearSearch(): Promise<void> {
    await this.dashboard.clearSearch();
  }

  async getSearchValue(): Promise<string> {
    return this.dashboard.getSearchValue();
  }

  // Batch 5D — Incremental loading
  async scrollToLoadMoreNote(): Promise<void> {
    await this.dashboard.scrollToLoadMoreNote();
  }

  async waitForNextProcessedPage(): Promise<void> {
    await this.dashboard.waitForNextProcessedPage();
  }

  async triggerSingleIncrementalLoad(): Promise<void> {
    await this.dashboard.triggerSingleIncrementalLoad();
  }

  async verifyNoDuplicateProcessedRecords(): Promise<boolean> {
    return this.dashboard.verifyNoDuplicateProcessedRecords();
  }

  // Batch 5E — History disable & pending restoration
  async disableHistory(): Promise<void> {
    await this.dashboard.disableHistory();
    await this.dashboard.waitForPendingView();
  }

  async isHistoryEnabled(): Promise<boolean> {
    return this.dashboard.isHistoryEnabled();
  }
}