import { test } from '../fixtures/base';
import { exerciseDashboardExtension } from '../helpers/dashboard-license-crud';
test('LIMAS-SUD-633: Successful owned extension refreshes visible dates',async({page})=>{test.setTimeout(240000);await exerciseDashboardExtension(page,'LIMAS-SUD-633','expiration-date');});
