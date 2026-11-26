import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-750: Reverse Tab reaches the radio group before the date field',async({page})=>{await verifyDashboardRegression(page,750);});
