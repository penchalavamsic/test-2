import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-104: New Profile shows the Role selection placeholder',async({page})=>{await verifyApprovalForm(page,104);});
