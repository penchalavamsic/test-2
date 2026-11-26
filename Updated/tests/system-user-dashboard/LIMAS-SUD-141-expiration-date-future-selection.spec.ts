import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-141: Future expiration date can be entered in the native date field',async({page})=>{await verifyApprovalForm(page,141);});
