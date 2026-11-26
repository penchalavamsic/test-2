import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-813: Native date field rejects invalid alphabetic date input',async({page})=>{await verifyDashboardRegression(page,813);});
