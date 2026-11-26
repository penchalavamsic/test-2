import { Page } from '@playwright/test';
import { performKeycloakLogin } from '../helpers/auth';
import { LoginPage } from '../pages/login.page';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';

/**
 * UI sign-in flow for the DEDICATED AUTHENTICATION TEST SUITE only.
 *
 * System User Dashboard tests must NOT import this — they rely on
 * the storageState loaded by the `system-user-dashboard` project
 * and the auth guard in `tests/fixtures/base.ts`.
 *
 * This class performs visible Keycloak UI login; using it in dashboard
 * tests causes repeated credential entry before every test.
 */
export class AuthenticationFlow {
  private loginPage: LoginPage;
  private dashboardPage: SystemUserDashboardPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new SystemUserDashboardPage(page);
  }

  async ensureAuthenticated(profileName: string): Promise<void> {
    const alreadyLoggedIn = await this.dashboardPage.isDisplayed();
    if (alreadyLoggedIn) {
      return;
    }

    await this.loginPage.goto();
    await performKeycloakLogin(this.page, profileName);
    await this.dashboardPage.waitForLoad();
  }
}
