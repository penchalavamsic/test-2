import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-402: No-match search shows an empty-state message',async({page})=>{await verifyDashboardRegression(page,402);});
