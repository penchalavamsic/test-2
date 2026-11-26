import { test } from '../fixtures/base';
import { exerciseDashboardExtension } from '../helpers/dashboard-license-crud';
test('LIMAS-SUD-632: Successful owned extension displays success feedback',async({page})=>{test.setTimeout(240000);await exerciseDashboardExtension(page,'LIMAS-SUD-632','expiration-date');});
