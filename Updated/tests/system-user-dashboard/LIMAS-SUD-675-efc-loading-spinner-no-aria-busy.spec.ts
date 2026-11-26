import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-675: no aria-busy on spinner or container during loading",async({page})=>{await verifyFloatingLoading(page,675);});
