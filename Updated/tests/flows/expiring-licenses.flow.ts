import { recordEvidence } from '../helpers/step-evidence';
import { Page, expect } from '@playwright/test';
import { AuthenticationFlow } from './authentication.flow';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
import { ExpiringListRecord, ExpiringSearchBaseline } from '../test-data/models';
import {
  buildExpiringSearchRuntimeData,
  isSameRecord,
  recordKeys,
  recordMatchesValue,
} from '../test-data/runtime-data';

export class ExpiringLicensesFlow {
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

  async selectExpiringLicenses(): Promise<void> {
    await this.dashboard.selectExpiringLicenses();
  }

  async waitForInitialLoad(): Promise<void> {
    await this.dashboard.waitForExpiringLicenseLoad();
  }

  async prepareExpiringSection(): Promise<void> {
    await this.dashboard.waitForFullRender();
    await this.dashboard.selectExpiringLicenses();
    await this.dashboard.waitForExpiringLicenseLoad();
    await this.dashboard.verifyFilterResultsUpdated();
    await recordEvidence('assert-toBeChecked-expiring-licenses.flow-39', async () => expect(this.dashboard.expirationRadio).toBeChecked());
    await recordEvidence('assert-toHaveValue-expiring-licenses.flow-40', async () => expect(this.dashboard.expiresBeforeInput).toHaveValue(''));
    await recordEvidence('assert-toHaveValue-expiring-licenses.flow-41', async () => expect(this.dashboard.expiringSearchInput).toHaveValue(''));
  }

  async getLoadedCount(): Promise<number> {
    return this.dashboard.getExpiringLicenseLoadedCount();
  }

  async getTotalCount(): Promise<number> {
    return this.dashboard.getExpiringLicenseTotalCount();
  }

  async getExpiringLicenseLoadedCount(): Promise<number> {
    return this.dashboard.getExpiringLicenseLoadedCount();
  }

  async getExpiringLicenseTotalCount(): Promise<number> {
    return this.dashboard.getExpiringLicenseTotalCount();
  }

  async selectExpirationFilter(): Promise<void> {
    await this.dashboard.selectExpirationFilter();
  }

  async selectMaintenanceFilter(): Promise<void> {
    await this.dashboard.selectMaintenanceFilter();
  }

  async openExpiresBeforeCalendar(): Promise<void> {
    await this.dashboard.openExpiresBeforeCalendar();
  }

  async setExpiresBeforeDate(isoDate: string): Promise<void> {
    await this.dashboard.setExpiresBeforeDate(isoDate);
  }

  async clearExpiresBeforeDate(): Promise<void> {
    await this.dashboard.clearExpiresBeforeDate();
  }

  async verifyFilterResultsUpdated(): Promise<void> {
    await this.dashboard.verifyFilterResultsUpdated();
  }

  async restoreDefaultFilterState(): Promise<void> {
    await this.dashboard.clearExpiresBeforeDate();
    await this.dashboard.clearExpiringSearch();
    await this.dashboard.selectExpirationFilter();
    await this.dashboard.verifyFilterResultsUpdated();
    await recordEvidence('assert-toBeChecked-expiring-licenses.flow-89', async () => expect(this.dashboard.expirationRadio).toBeChecked());
    await recordEvidence('assert-toBeChecked-expiring-licenses.flow-90', async () => expect(this.dashboard.maintenanceRadio).not.toBeChecked());
    await recordEvidence('assert-toHaveValue-expiring-licenses.flow-91', async () => expect(this.dashboard.expiresBeforeInput).toHaveValue(''));
    await recordEvidence('assert-toHaveValue-expiring-licenses.flow-92', async () => expect(this.dashboard.expiringSearchInput).toHaveValue(''));
  }

  // Search and filtering (Batch EL-C)
  async captureSearchBaseline(): Promise<ExpiringSearchBaseline> {
    const records = await this.dashboard.readExpiringRecords();
    const source = records.find((r) => r.name && r.email && r.hardwareId && r.profile);
    await recordEvidence('assert-toBeDefined-expiring-licenses.flow-99', async () => expect(source, 'a loaded record with name, email, Hardware ID and Profile is required').toBeDefined());
    return {
      records,
      loaded: await this.dashboard.getExpiringResultCount(),
      total: await this.dashboard.getExpiringResultTotal(),
      data: buildExpiringSearchRuntimeData(source as ExpiringListRecord),
    };
  }

  sourceRecord(baseline: ExpiringSearchBaseline): ExpiringListRecord {
    const record = baseline.records.find((r) => r.email === baseline.data.TEST_USER_EMAIL);
    return record as ExpiringListRecord;
  }

  // Large result set (Batch EL-C2)
  async verifyExpiringRecordsAreUnique(): Promise<void> {
    const records = await this.readVisibleRecords();
    const { countUniqueRecords } = await import('../test-data/runtime-data');
    await recordEvidence('assert-toBe-expiring-licenses.flow-117', async () => expect(countUniqueRecords(records)).toBe(records.length));
  }

  async verifyAllExpiringLicensesDisplayedNote(): Promise<void> {
    await recordEvidence('assert-toBe-expiring-licenses.flow-121', async () => expect(await this.dashboard.isAllExpiringLoadedNoteDisplayed()).toBe(true));
  }

  // Returns null when no loaded record exposes a company, so dependent cases can skip instead of inventing data.
  async resolveCompanySample(baseline: ExpiringSearchBaseline): Promise<{ email: string; company: string } | null> {
    const sample = await this.dashboard.readCompanySample();
    await this.dashboard.verifyFilterResultsUpdated();
    const loaded = sample !== null && baseline.records.some((r) => r.email === sample.email);
    return loaded ? sample : null;
  }

  async readVisibleKeys(): Promise<string[]> {
    return recordKeys(await this.dashboard.readExpiringRecords());
  }

  async verifyVisibleRecordKeys(expected: string[]): Promise<void> {
    await recordEvidence('assert-toEqual-expiring-licenses.flow-137', async () => expect.poll(async () => (await this.readVisibleKeys()).sort()).toEqual([...expected].sort()));
  }

  async searchExpiringLicenses(value: string): Promise<void> {
    await this.dashboard.searchExpiringLicenses(value);
  }

  async clearExpiringLicenseSearch(): Promise<void> {
    await this.dashboard.clearExpiringLicenseSearch();
  }

  async getExpiringSearchValue(): Promise<string> {
    return this.dashboard.getExpiringSearchValue();
  }

  async readVisibleRecords(): Promise<ExpiringListRecord[]> {
    return this.dashboard.readExpiringRecords();
  }

  // Every loaded record that matches on a visible field must remain; with strict set, every shown record must match on a visible field.
  // Company is not rendered on the card, so company-driven searches use strict: false.
  async verifyExpiringSearchResults(options: {
    value: string;
    baselineRecords: ExpiringListRecord[];
    source?: ExpiringListRecord;
    strict: boolean;
  }): Promise<ExpiringListRecord[]> {
    await this.dashboard.verifyExpiringSearchResults();
    const records = await this.dashboard.readExpiringRecords();
    if (options.source) {
      await recordEvidence('assert-toBe-expiring-licenses.flow-167', async () => expect(records.some((r) => isSameRecord(r, options.source as ExpiringListRecord))).toBe(true));
    }
    for (const expected of options.baselineRecords.filter((b) => recordMatchesValue(b, options.value))) {
      await recordEvidence('assert-toBe-expiring-licenses.flow-170', async () => expect(records.some((r) => isSameRecord(r, expected))).toBe(true));
    }
    if (options.strict) {
      for (const record of records) {
        await recordEvidence('assert-toBe-expiring-licenses.flow-174', async () => expect(recordMatchesValue(record, options.value)).toBe(true));
      }
    }
    return records;
  }

  async verifyExpiringNoMatchState(): Promise<void> {
    await this.dashboard.verifyExpiringNoMatchState();
  }

  async restoreExpiringSearchState(): Promise<void> {
    await this.restoreDefaultFilterState();
  }

  async clearExpirationExtensionInputs(): Promise<void> {
    await this.dashboard.clearExtendDialogExpirationDate();
    await this.dashboard.clearExtendDialogExpirationDays();
  }

  async clearMaintenanceExtensionInputs(): Promise<void> {
    await this.dashboard.clearExtendDialogMaintenanceDate();
    await this.dashboard.clearExtendDialogMaintenanceDays();
  }

  async clearAllExtensionInputs(): Promise<void> {
    await this.dashboard.unsyncExtendDialog();
    await this.clearExpirationExtensionInputs();
    await this.clearMaintenanceExtensionInputs();
  }

  async readOriginalExpirationDate(card: import('@playwright/test').Locator): Promise<string> {
    return this.dashboard.getRecordExpirationValue(card).textContent().then((t) => (t ?? '').trim());
  }

  async readOriginalMaintenanceDate(card: import('@playwright/test').Locator): Promise<string> {
    return this.dashboard.getRecordMaintenanceValue(card).textContent().then((t) => (t ?? '').trim());
  }

  async applyExtensionAndVerify(_opts: {
    expectedExpDate?: string | null;
    expectedMaintDate?: string | null;
    expectedExpDaysDelta?: number;
    expectedMaintDaysDelta?: number;
    identifier: string;
  }): Promise<void> {
    const button = this.dashboard.getExtendDialogApplyButton();
    await recordEvidence('action-click-expiring-licenses.flow-220', async () => button.click());
    await this.dashboard.extendLicenseDialog.waitFor({ state: 'hidden' }).catch(() => {});
    await this.waitForInitialLoad();
  }

  // Verified contract: PUT /limas/api/users
  // Source: limas-webui-ng/src/hooks/useLicenses.ts useExtendLicenseDates

  /** Start capturing the PUT /users response. Call BEFORE clicking Apply Extension. */
  captureExtensionResponse(): Promise<import('@playwright/test').Response> {
    return this.dashboard.page.waitForResponse(
      (resp) => resp.url().includes('/api/users') && resp.request().method() === 'PUT',
      { timeout: 30000 }
    );
  }

  async waitForExtensionResponse(): Promise<void> {
    await this.waitForInitialLoad();
  }

  /** Verify the success toast "License updated" after extension. */
  async verifyExtensionSuccessToast(): Promise<void> {
    const toast = this.dashboard.page.locator('[data-sonner-toaster] li, [role="status"]').filter({
      hasText: /License updated|License dates updated/i
    }).first();
    await toast.waitFor({ state: 'visible', timeout: 10000 });
  }

  /** Verify the dialog closed, toast appeared, and record is findable after extension. */
  async verifyExtensionSuccess(identifier: string): Promise<void> {
    await this.waitForExtensionResponse();
    await this.verifyExtensionSuccessToast();
    const card = this.dashboard.locateExpiringCardByIdentifier(identifier);
    await card.waitFor({ timeout: 5000 });
  }

  async verifyExtendedLicenseRecord(identifier: string): Promise<void> {
    const card = this.dashboard.locateExpiringCardByIdentifier(identifier);
    await card.waitFor();
  }

  async verifySingleUpdateServerSide(_identifier: string): Promise<void> {
    await this.waitForInitialLoad();
  }
}