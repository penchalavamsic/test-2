import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-689: count values derived from API response",async({page})=>{await verifyFloatingLoading(page,689);});
