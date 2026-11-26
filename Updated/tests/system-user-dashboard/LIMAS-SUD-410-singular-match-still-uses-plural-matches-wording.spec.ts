import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-410: A unique runtime license search shows one match',async({page})=>{await verifyDashboardRegression(page,410);});
