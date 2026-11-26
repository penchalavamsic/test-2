import { test } from '../fixtures/base';
import { exerciseDashboardExtension } from '../helpers/dashboard-license-crud';
test('LIMAS-SUD-634: Owned extended license remains discoverable within the cutoff',async({page})=>{test.setTimeout(240000);await exerciseDashboardExtension(page,'LIMAS-SUD-634','expiration-date');});
