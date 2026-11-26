import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-541: Numeric extension field rejects alphabetic input',async({page})=>{await verifyDashboardRegression(page,541);});
