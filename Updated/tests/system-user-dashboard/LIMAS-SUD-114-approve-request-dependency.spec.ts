import { test } from '../fixtures/base';
import { verifyApprovalForm } from '../helpers/dashboard-approval-form';
test('LIMAS-SUD-114: Approve requires Group Profile Role and both dates',async({page})=>{await verifyApprovalForm(page,114);});
