import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-137: Changing Profile resets Role selection',async({page})=>{await verifyApprovalForm(page,137);});
