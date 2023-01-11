/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrivacyScope } from './PrivacyScope.js';

export type GivenConsentEvent = {
  id: string;
  date: string;
  name?: string;
  scope: PrivacyScope;
};
