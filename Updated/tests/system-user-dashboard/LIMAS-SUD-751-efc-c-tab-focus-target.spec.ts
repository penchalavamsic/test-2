import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-751: Reverse Tab focuses the checked expiration radio',async({page})=>{await verifyDashboardRegression(page,751);});
