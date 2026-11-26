import { recordEvidence } from '../helpers/step-evidence';
import { test, expect } from '../fixtures/base';
import { SystemUserDashboardPage } from '../pages/system-user-dashboard.page';
test('LIMAS-SUD-024: Header displays the signed-in account email as required',async({page})=>{const d=new SystemUserDashboardPage(page);await d.waitForFullRender();await recordEvidence('assert-toBeVisible-LIMAS-SUD-024-account-text.spec-3', async () => expect(d.accountText,'Confirmed requirement: email must be displayed, not only an account identifier').toBeVisible());await recordEvidence('assert-toContainText-LIMAS-SUD-024-account-text.spec-3', async () => expect(d.accountText).toContainText(/[^\s@]+@[^\s@]+\.[^\s@]+/));});
