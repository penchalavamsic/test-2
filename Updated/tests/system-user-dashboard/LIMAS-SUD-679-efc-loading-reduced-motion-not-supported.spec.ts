import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-679: prefers-reduced-motion not supported by spinner",async({page})=>{await verifyFloatingLoading(page,679);});
