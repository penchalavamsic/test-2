import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-701: loading begins after request starts",async({page})=>{await verifyFloatingLoading(page,701);});
