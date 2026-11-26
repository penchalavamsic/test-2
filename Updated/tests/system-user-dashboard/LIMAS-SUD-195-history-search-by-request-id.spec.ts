import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-195: Processed request reference search uses available runtime data',async({page})=>{await verifyDashboardRegression(page,195);});
