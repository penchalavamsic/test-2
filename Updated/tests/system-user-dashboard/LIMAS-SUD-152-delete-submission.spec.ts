import { test } from '../fixtures/base';
import { exerciseDashboardRequest } from '../helpers/dashboard-request-crud';
test('LIMAS-SUD-152: Dismiss an owned pending request and verify persisted results', async({page})=>{test.setTimeout(300000);await exerciseDashboardRequest(page,'LIMAS-SUD-152','delete');});
