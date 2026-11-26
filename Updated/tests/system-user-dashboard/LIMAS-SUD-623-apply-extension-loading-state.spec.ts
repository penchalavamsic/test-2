import { test } from '../fixtures/base';
import { verifyExtensionControl } from '../helpers/dashboard-extension-controls';
test('LIMAS-SUD-623: Apply shows its pending state while the controlled request waits',async({page})=>{await verifyExtensionControl(page,623);});
