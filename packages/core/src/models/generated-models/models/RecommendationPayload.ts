/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RecommendationPayload = {
  status: RecommendationPayload.status;
  motive?: RecommendationPayload.motive;
  data_categories?: Array<string>;
  date_from?: string;
  date_to?: string;
  provenance?: RecommendationPayload.provenance;
  target?: RecommendationPayload.target;
};

export namespace RecommendationPayload {
  export enum status {
    GRANTED = 'GRANTED',
    DENIED = 'DENIED',
    PARTIALLY_GRANTED = 'PARTIALLY-GRANTED',
    UNDER_REVIEW = 'UNDER-REVIEW',
    CANCELED = 'CANCELED',
  }

  export enum motive {
    IDENTITY_UNCONFIRMED = 'IDENTITY-UNCONFIRMED',
    LANGUAGE_UNSUPPORTED = 'LANGUAGE-UNSUPPORTED',
    VALID_REASONS = 'VALID-REASONS',
    IMPOSSIBLE = 'IMPOSSIBLE',
    NO_SUCH_DATA = 'NO-SUCH-DATA',
    REQUEST_UNSUPPORTED = 'REQUEST-UNSUPPORTED',
    USER_UNKNOWN = 'USER-UNKNOWN',
    OTHER_MOTIVE = 'OTHER-MOTIVE',
  }

  export enum provenance {
    _ = '*',
    DERIVED = 'DERIVED',
    TRANSFERRED = 'TRANSFERRED',
    USER = 'USER',
    USER_DATA_SUBJECT = 'USER.DATA-SUBJECT',
  }

  export enum target {
    _ = '*',
    ORGANIZATION = 'ORGANIZATION',
    SYSTEM = 'SYSTEM',
    PARTNERS = 'PARTNERS',
    PARTNERS_DOWNWARD = 'PARTNERS.DOWNWARD',
    PARTNERS_UPWARD = 'PARTNERS.UPWARD',
  }
}
