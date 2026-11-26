import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-267: Disabling history restores the pending view from available data',async({page})=>{await verifyDashboardRegression(page,267);});
