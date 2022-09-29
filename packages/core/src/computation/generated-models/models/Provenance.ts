/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Provenance = {
  id: string;
  provenance: Provenance.provenance;
  system?: string;
};

export namespace Provenance {
  export enum provenance {
    _ = '*',
    DERIVED = 'DERIVED',
    TRANSFERRED = 'TRANSFERRED',
    USER = 'USER',
    USER_DATA_SUBJECT = 'USER.DATA-SUBJECT',
  }
}
