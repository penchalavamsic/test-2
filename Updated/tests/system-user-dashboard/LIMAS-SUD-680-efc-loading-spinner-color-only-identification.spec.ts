import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-680: spinner identified only by motion and color",async({page})=>{await verifyFloatingLoading(page,680);});
