import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-485: Extend is accessible before opening its dialog',async({page})=>{await verifyDashboardRegression(page,485);});
