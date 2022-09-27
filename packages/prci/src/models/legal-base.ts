/* eslint-disable camelcase */
import { LEGAL_BASE_TYPE } from '@blindnet/core';
import { PrivacyScope } from './privacy-scope.js';

export interface LegalBase {
  id: string;
  lb_type: LEGAL_BASE_TYPE;
  scope: PrivacyScope;
  name?: string;
  description?: string;
  active: boolean;
}
