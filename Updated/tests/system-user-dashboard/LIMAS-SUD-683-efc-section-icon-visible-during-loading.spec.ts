import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-683: alert triangle icon visible during loading",async({page})=>{await verifyFloatingLoading(page,683);});
