# Purpose

To verify the functionality of \"Keycloak\" → \"Password\" → \"Masked state\

# Preconditions

`${LIMAS_BASE_URL}` is reachable.

# Test Steps

1. Action: Navigate to `${LIMAS_BASE_URL}` and click Sign In.
Expected Result: Keycloak login page loads.
2. Action: Locate the Password field.
Expected Result: The field has type "password" (masked). A "Show password" toggle button is also present.

# Expected Final Result

The Password field masks entered characters by default and provides a Show password toggle.
