import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-205: History search returns matching records regardless of cache fetches',async({page})=>{await verifyDashboardRegression(page,205);});
