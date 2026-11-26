import { test } from '../fixtures/base';
import { verifyExtensionControl } from '../helpers/dashboard-extension-controls';
test('LIMAS-SUD-638: Applying state is exposed in the button accessible name',async({page})=>{await verifyExtensionControl(page,638);});
