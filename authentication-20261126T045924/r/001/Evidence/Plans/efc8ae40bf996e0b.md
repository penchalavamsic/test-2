# Purpose

To verify the functionality of \"Authentication\" → \"Sign In button\" → \"Navigate to Keycloak\

# Preconditions

`${LIMAS_BASE_URL}` is reachable.

# Test Steps

1. Action: Navigate to `${LIMAS_BASE_URL}`.
Expected Result: Login page loads with Sign In button visible.
2. Action: Click the Sign In button.
Expected Result: Browser navigates to the Keycloak OpenID Connect authorization endpoint.
3. Action: Inspect the page after navigation.
Expected Result: Keycloak login page is displayed with heading "Sign in to your account".

# Expected Final Result

After clicking Sign In, the browser navigates to the Keycloak login page showing the "Sign in to your account" heading.
