import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-674: loading spinner has no accessible name",async({page})=>{await verifyFloatingLoading(page,674);});
