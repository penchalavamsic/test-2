# LIMAS-SUD-1940: Required-field validation prevents persistence

The deployed form validates on Save. Open Create, submit empty required fields, verify visible validation and aria-invalid on Profile, Role, capacity and checkout fields, require no mutation request, and cancel. A route guard blocks any accidental invalid write while preserving a failing result. A disabled Save button is not required.
