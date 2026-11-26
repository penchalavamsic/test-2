import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-200: Keyboard clear restores processed request results',async({page})=>{await verifyDashboardRegression(page,200);});
