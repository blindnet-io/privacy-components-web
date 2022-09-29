/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PrivacyScopeDimensionsPayload = {
  data_categories?: Array<string>;
  processing_categories?: Array<
    | '*'
    | 'ANONYMIZATION'
    | 'AUTOMATED-INFERENCE'
    | 'AUTOMATED-DECISION-MAKING'
    | 'COLLECTION'
    | 'GENERATING'
    | 'PUBLISHING'
    | 'STORING'
    | 'SHARING'
    | 'USING'
    | 'OTHER-PROCESSING'
  >;
  purposes?: Array<
    | '*'
    | 'ADVERTISING'
    | 'COMPLIANCE'
    | 'EMPLOYMENT'
    | 'JUSTICE'
    | 'MARKETING'
    | 'MEDICAL'
    | 'PERSONALIZATION'
    | 'PUBLIC-INTERESTS'
    | 'RESEARCH'
    | 'SALE'
    | 'SECURITY'
    | 'SERVICES'
    | 'SERVICES.ADDITIONAL-SERVICES'
    | 'SERVICES.BASIC-SERVICE'
    | 'SOCIAL-PROTECTION'
    | 'TRACKING'
    | 'VITAL-INTERESTS'
    | 'OTHER-PURPOSE'
  >;
};
