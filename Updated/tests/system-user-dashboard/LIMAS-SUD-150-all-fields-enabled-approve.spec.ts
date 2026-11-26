import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-150: Completing all required fields enables approval',async({page})=>{await verifyApprovalForm(page,150);});
