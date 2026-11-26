import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-146: Keyboard activation of Cancel closes the inline form',async({page})=>{await verifyApprovalForm(page,146);});
