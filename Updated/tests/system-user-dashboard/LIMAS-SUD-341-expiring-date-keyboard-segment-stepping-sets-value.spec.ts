import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-341: Native date keyboard stepping produces a changed valid date',async({page})=>{await verifyDashboardRegression(page,341);});
