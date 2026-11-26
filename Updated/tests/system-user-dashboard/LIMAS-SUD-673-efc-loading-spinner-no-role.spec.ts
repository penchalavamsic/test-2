import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-673: loading spinner has no ARIA role",async({page})=>{await verifyFloatingLoading(page,673);});
