/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ProvenanceRestriction = {
  term: ProvenanceRestriction.term;
  target?: ProvenanceRestriction.target;
};

export namespace ProvenanceRestriction {
  export enum term {
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
