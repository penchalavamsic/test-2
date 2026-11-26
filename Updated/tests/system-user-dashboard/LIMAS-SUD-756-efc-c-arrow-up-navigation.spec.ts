import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-756: ArrowUp selects expiration from maintenance without assuming a new request',async({page})=>{await verifyDashboardRegression(page,756);});
