import { test } from '../fixtures/base';
import { verifyExtensionControl } from '../helpers/dashboard-extension-controls';
test('LIMAS-SUD-630: Apply is disabled while a controlled request is pending',async({page})=>{await verifyExtensionControl(page,630);});
