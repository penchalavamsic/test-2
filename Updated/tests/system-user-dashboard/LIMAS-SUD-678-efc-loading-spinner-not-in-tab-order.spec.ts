import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-678: spinner does not enter tab order",async({page})=>{await verifyFloatingLoading(page,678);});
