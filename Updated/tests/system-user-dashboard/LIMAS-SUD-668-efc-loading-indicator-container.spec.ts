import { test } from '../fixtures/base';
import { verifyFloatingLoading } from '../helpers/dashboard-floating-loading';
test("LIMAS-SUD-668: spinner container uses min-h-36 centered layout",async({page})=>{await verifyFloatingLoading(page,668);});
