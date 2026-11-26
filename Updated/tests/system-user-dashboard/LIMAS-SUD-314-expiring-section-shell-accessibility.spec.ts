import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-314: Expiring filters have meaningful accessible labels',async({page})=>{await verifyDashboardRegression(page,314);});
