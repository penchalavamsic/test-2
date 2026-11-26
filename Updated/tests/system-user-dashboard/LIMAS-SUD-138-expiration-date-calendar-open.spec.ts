import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-138: Expiration calendar control invokes the native date picker',async({page})=>{await verifyApprovalForm(page,138);});
