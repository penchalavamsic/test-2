import { test } from '../fixtures/base';
import { verifyExtensionControl } from '../helpers/dashboard-extension-controls';
test('LIMAS-SUD-629: Maintenance after expiration is rejected without writing',async({page})=>{await verifyExtensionControl(page,629);});
