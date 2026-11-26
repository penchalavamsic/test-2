import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-297: Expiration radio is reachable by keyboard from the summary card',async({page})=>{await verifyDashboardRegression(page,297);});
