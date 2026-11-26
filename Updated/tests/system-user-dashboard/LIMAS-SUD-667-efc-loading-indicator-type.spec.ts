import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-667: loading indicator type is Loader2 with animate-spin",async({page})=>{await verifyFloatingLoading(page,667);});
