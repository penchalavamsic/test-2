import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-119: Request reference search uses the Delete button accessible label',async({page})=>{await verifyDashboardRegression(page,119);});
