import { test } from '../fixtures/base';
import { exerciseDashboardExtension } from '../helpers/dashboard-license-crud';
test('LIMAS-SUD-628: Synchronized extension days persist on an owned license',async({page})=>{test.setTimeout(240000);await exerciseDashboardExtension(page,'LIMAS-SUD-628','sync-days');});
