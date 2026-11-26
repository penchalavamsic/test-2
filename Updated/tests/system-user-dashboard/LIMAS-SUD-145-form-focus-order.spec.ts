import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-145: Keyboard focus follows Group Profile and Role order',async({page})=>{await verifyApprovalForm(page,145);});
