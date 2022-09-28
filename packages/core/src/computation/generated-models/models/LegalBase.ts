/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PrivacyScope } from './PrivacyScope.js';

export type LegalBase = {
  id: string;
  lb_type: LegalBase.lb_type;
  scope: PrivacyScope;
  name?: string;
  description?: string;
  active: boolean;
};

export namespace LegalBase {
  export enum lb_type {
    CONTRACT = 'CONTRACT',
    CONSENT = 'CONSENT',
    LEGITIMATE_INTEREST = 'LEGITIMATE-INTEREST',
    NECESSARY = 'NECESSARY',
    NECESSARY_LEGAL_OBLIGATION = 'NECESSARY.LEGAL-OBLIGATION',
    NECESSARY_PUBLIC_INTEREST = 'NECESSARY.PUBLIC-INTEREST',
    NECESSARY_VITAL_INTEREST = 'NECESSARY.VITAL-INTEREST',
    OTHER_LEGAL_BASE = 'OTHER-LEGAL-BASE',
  }
}
