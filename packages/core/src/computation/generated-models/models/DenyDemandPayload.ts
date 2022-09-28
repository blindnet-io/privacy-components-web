/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DenyDemandPayload = {
  id: string;
  motive: DenyDemandPayload.motive;
  msg?: string;
  lang?: string;
};

export namespace DenyDemandPayload {
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
}
