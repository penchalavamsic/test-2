import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-136: Changing Group preserves the selected Profile and Role',async({page})=>{await verifyApprovalForm(page,136);});
