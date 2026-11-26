import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-440: Filter round trip leaves controls operable and focusable',async({page})=>{await verifyDashboardRegression(page,440);});
