import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-149: Missing expiration keeps approval disabled',async({page})=>{await verifyApprovalForm(page,149);});
