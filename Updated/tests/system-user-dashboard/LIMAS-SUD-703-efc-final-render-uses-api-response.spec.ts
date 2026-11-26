import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-703: final render uses API response data",async({page})=>{await verifyFloatingLoading(page,703);});
