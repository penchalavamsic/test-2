import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-122: Keyboard clear restores pending request results',async({page})=>{await verifyDashboardRegression(page,122);});
