import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-103: Role appears after choosing an assigned Profile',async({page})=>{await verifyApprovalForm(page,103);});
