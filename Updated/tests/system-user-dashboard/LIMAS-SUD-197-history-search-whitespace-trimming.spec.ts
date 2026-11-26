import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-197: History filtering ignores surrounding search whitespace',async({page})=>{await verifyDashboardRegression(page,197);});
