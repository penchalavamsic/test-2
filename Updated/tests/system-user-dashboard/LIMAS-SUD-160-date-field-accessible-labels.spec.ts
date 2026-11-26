import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-160: Approval date fields have accessible labels',async({page})=>{await verifyApprovalForm(page,160);});
