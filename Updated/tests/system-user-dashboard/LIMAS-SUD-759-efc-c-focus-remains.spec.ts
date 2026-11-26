import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-759: Arrow selection retains focus on the selected radio',async({page})=>{await verifyDashboardRegression(page,759);});
