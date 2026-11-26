import { test } from '../fixtures/base';
import { verifyDashboardRegression } from '../helpers/dashboard-regressions';
test('LIMAS-SUD-236: Processed history shows readable records and count status',async({page})=>{await verifyDashboardRegression(page,236);});
