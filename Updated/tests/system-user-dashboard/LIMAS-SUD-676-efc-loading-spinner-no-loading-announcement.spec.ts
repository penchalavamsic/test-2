import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-676: no loading announcement to assistive technology",async({page})=>{await verifyFloatingLoading(page,676);});
