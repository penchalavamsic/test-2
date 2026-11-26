import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-669: CardContent body replaced by spinner during loading",async({page})=>{await verifyFloatingLoading(page,669);});
