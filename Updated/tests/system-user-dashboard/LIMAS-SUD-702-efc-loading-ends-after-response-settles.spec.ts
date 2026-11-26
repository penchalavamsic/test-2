import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-702: loading ends after response settles",async({page})=>{await verifyFloatingLoading(page,702);});
