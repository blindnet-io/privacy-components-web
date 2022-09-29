/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * keep CONTACT for no longer than 30 days after a service defined by a legal base ends
 */
export type CreateRetentionPolicyPayload = {
  /**
   * data category for which the policy is created
   */
  data_category: string;
  /**
   * retention policy
   */
  policy: CreateRetentionPolicyPayload.policy;
  /**
   * duration in JSON Schema duration format
   */
  duration: string;
  /**
   * event type to which the retention duration is relative to
   */
  after: CreateRetentionPolicyPayload.after;
};

export namespace CreateRetentionPolicyPayload {
  /**
   * retention policy
   */
  export enum policy {
    NO_LONGER_THAN = 'NO-LONGER-THAN',
    NO_LESS_THAN = 'NO-LESS-THAN',
  }

  /**
   * event type to which the retention duration is relative to
   */
  export enum after {
    CAPTURE_DATE = 'CAPTURE-DATE',
    RELATIONSHIP_START = 'RELATIONSHIP-START',
    RELATIONSHIP_END = 'RELATIONSHIP-END',
    SERVICE_START = 'SERVICE-START',
    SERVICE_END = 'SERVICE-END',
  }
}
