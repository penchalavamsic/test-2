export interface AuthenticationData {
  accessProfile: string;
  usernameEnvVar: string;
  passwordEnvVar: string;
  expectedLandingRoute: string;
  expectedLandingHeading: string;
}

export interface SearchData {
  query: string;
  expectedMinResults: number;
}

export interface LicenseApprovalData {
  requestId: string;
  featureName: string;
  featureVersion: string;
}

export interface DateData {
  maintenanceDate: string;
  expirationDate: string;
}

export interface ExpiresBeforeRuntimeDates {
  TEST_CURRENT_DATE: string;
  TEST_PAST_DATE: string;
  TEST_FUTURE_DATE: string;
  TEST_EXPIRES_BEFORE_DATE: string;
  TEST_MONTH_BOUNDARY_DATE: string;
  TEST_INVALID_MONTH_DATE: string;
  TEST_INVALID_DAY_DATE: string;
  TEST_UNSUPPORTED_FORMAT_DATE: string;
}

export interface FloatingLicensesRuntimeData {
  TEST_FL_FUTURE_DATE: string;
  TEST_FL_PAST_DATE: string;
  TEST_FL_CURRENT_DATE: string;
  TEST_FL_MONTH_BOUNDARY_DATE: string;
  TEST_FL_SECOND_DATE: string;
  TEST_FL_SEARCH_NO_MATCH: string;
}

export interface ExpiringListRecord {
  name: string;
  email: string;
  hardwareId: string;
  profile: string;
}

export interface ExpiringSearchRuntimeData {
  TEST_EXPIRING_RECORD_IDENTIFIER: string;
  TEST_USER_NAME: string;
  TEST_USER_EMAIL: string;
  TEST_PROFILE: string;
  TEST_COMPANY: string;
  TEST_HARDWARE_ID: string;
  TEST_PARTIAL_SEARCH_VALUE: string;
  TEST_NO_MATCH_VALUE: string;
  TEST_SPECIAL_CHARACTER_VALUE: string;
  TEST_EXTENSION_CURRENT_DATE: string;
  TEST_EXTENSION_FUTURE_DATE: string;
  TEST_EXTENSION_PAST_DATE: string;
  TEST_EXTENSION_MONTH_BOUNDARY_DATE: string;
  TEST_EXPIRATION_EXTENSION_DAYS: string;
  TEST_EXPIRATION_EXTENSION_MIN_DAYS: string;
  TEST_EXPIRATION_EXTENSION_LARGE_DAYS: string;
  TEST_MAINTENANCE_CURRENT_DATE: string;
  TEST_MAINTENANCE_FUTURE_DATE: string;
  TEST_MAINTENANCE_PAST_DATE: string;
  TEST_MAINTENANCE_MONTH_BOUNDARY_DATE: string;
  TEST_MAINTENANCE_EXTENSION_DAYS: string;
  TEST_MAINTENANCE_EXTENSION_MIN_DAYS: string;
  TEST_MAINTENANCE_EXTENSION_LARGE_DAYS: string;
}

export interface ExpiringSpecialCharacterValues {
  TEST_SPECIAL_HYPHEN: string;
  TEST_SPECIAL_UNDERSCORE: string;
  TEST_SPECIAL_AT_SIGN: string;
  TEST_SPECIAL_PERIOD: string;
  TEST_SPECIAL_APOSTROPHE: string;
}

export interface ExpiringWhitespaceValues {
  TEST_LEADING_WHITESPACE_VALUE: string;
  TEST_TRAILING_WHITESPACE_VALUE: string;
  TEST_PADDED_WHITESPACE_VALUE: string;
  TEST_SPACES_ONLY_VALUE: string;
}

export interface ExpiringSearchBaseline {
  records: ExpiringListRecord[];
  loaded: number;
  total: number;
  data: ExpiringSearchRuntimeData;
}

export interface ExpirationExtensionRuntimeData {
  TEST_EXPIRING_RECORD_IDENTIFIER: string;
  TEST_EXTENSION_CURRENT_DATE: string;
  TEST_EXTENSION_FUTURE_DATE: string;
  TEST_EXTENSION_PAST_DATE: string;
  TEST_EXTENSION_MONTH_BOUNDARY_DATE: string;
  TEST_EXPIRATION_EXTENSION_DAYS: string;
  TEST_EXPIRATION_EXTENSION_MIN_DAYS: string;
  TEST_EXPIRATION_EXTENSION_LARGE_DAYS: string;
}

export interface ExpirationExtensionBaseline {
  records: ExpiringListRecord[];
  loaded: number;
  total: number;
  data: ExpirationExtensionRuntimeData;
}

export interface EFCCombinedRuntimeData {
  TEST_EFC_COMBINATION_DATE: string;
  TEST_EFC_COMBINATION_SECOND_DATE: string;
  TEST_EFC_SEARCH_NO_MATCH: string;
  TEST_EFC_SEARCH_MIXED_CASE: string;
  TEST_EFC_SEARCH_SPACED_VALUE: string;
}

export interface AccessProfileData {
  profileName: string;
  expectedTabs: string[];
}

export interface RuntimeTestOptions {
  accessProfile: string;
  timeout?: number;
}