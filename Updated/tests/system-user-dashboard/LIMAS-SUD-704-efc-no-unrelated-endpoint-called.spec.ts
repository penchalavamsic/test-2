import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-704: no unrelated endpoint called during EFC loading",async({page})=>{await verifyFloatingLoading(page,704);});
