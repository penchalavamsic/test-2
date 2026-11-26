import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-677: spinner is not keyboard-focusable",async({page})=>{await verifyFloatingLoading(page,677);});
