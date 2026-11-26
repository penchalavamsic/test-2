import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-155: Required indicators and submission gating are consistent',async({page})=>{await verifyApprovalForm(page,155);});
