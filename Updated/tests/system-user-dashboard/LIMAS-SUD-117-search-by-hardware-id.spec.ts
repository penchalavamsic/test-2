import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-117: Hardware ID search matches actual request data without assuming numeric format',async({page})=>{await verifyDashboardRegression(page,117);});
