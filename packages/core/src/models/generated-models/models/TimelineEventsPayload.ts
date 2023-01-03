/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GivenConsentEvent } from './GivenConsentEvent.js';
import type { LegalBaseEvent } from './LegalBaseEvent.js';
import type { PrivacyRequestEvent } from './PrivacyRequestEvent.js';
import type { PrivacyResponseEvent } from './PrivacyResponseEvent.js';
import type { RevokedConsentEvent } from './RevokedConsentEvent.js';

export type TimelineEventsPayload = {
  requests?: Array<PrivacyRequestEvent>;
  responses?: Array<PrivacyResponseEvent>;
  given_consents?: Array<GivenConsentEvent>;
  revoked_consents?: Array<RevokedConsentEvent>;
  legal_bases?: Array<LegalBaseEvent>;
};
