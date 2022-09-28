/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PrivacyScopeTriple = {
  data_category: string;
  processing_category: PrivacyScopeTriple.processing_category;
  purpose: PrivacyScopeTriple.purpose;
};

export namespace PrivacyScopeTriple {
  export enum processing_category {
    _ = '*',
    ANONYMIZATION = 'ANONYMIZATION',
    AUTOMATED_INFERENCE = 'AUTOMATED-INFERENCE',
    AUTOMATED_DECISION_MAKING = 'AUTOMATED-DECISION-MAKING',
    COLLECTION = 'COLLECTION',
    GENERATING = 'GENERATING',
    PUBLISHING = 'PUBLISHING',
    STORING = 'STORING',
    SHARING = 'SHARING',
    USING = 'USING',
    OTHER_PROCESSING = 'OTHER-PROCESSING',
  }

  export enum purpose {
    _ = '*',
    ADVERTISING = 'ADVERTISING',
    COMPLIANCE = 'COMPLIANCE',
    EMPLOYMENT = 'EMPLOYMENT',
    JUSTICE = 'JUSTICE',
    MARKETING = 'MARKETING',
    MEDICAL = 'MEDICAL',
    PERSONALIZATION = 'PERSONALIZATION',
    PUBLIC_INTERESTS = 'PUBLIC-INTERESTS',
    RESEARCH = 'RESEARCH',
    SALE = 'SALE',
    SECURITY = 'SECURITY',
    SERVICES = 'SERVICES',
    SERVICES_ADDITIONAL_SERVICES = 'SERVICES.ADDITIONAL-SERVICES',
    SERVICES_BASIC_SERVICE = 'SERVICES.BASIC-SERVICE',
    SOCIAL_PROTECTION = 'SOCIAL-PROTECTION',
    TRACKING = 'TRACKING',
    VITAL_INTERESTS = 'VITAL-INTERESTS',
    OTHER_PURPOSE = 'OTHER-PURPOSE',
  }
}
