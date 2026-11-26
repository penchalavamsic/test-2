import { test } from '../fixtures/base';
import { exerciseDashboardExtension } from '../helpers/dashboard-license-crud';
test('LIMAS-SUD-626: Expiration days persist on an owned license',async({page})=>{test.setTimeout(240000);await exerciseDashboardExtension(page,'LIMAS-SUD-626','expiration-days');});
