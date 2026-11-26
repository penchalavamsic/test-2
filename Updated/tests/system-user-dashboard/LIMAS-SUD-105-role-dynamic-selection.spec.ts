import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-105: Role options match the selected runtime Profile',async({page})=>{await verifyApprovalForm(page,105);});
