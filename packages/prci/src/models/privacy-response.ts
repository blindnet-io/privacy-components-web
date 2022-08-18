/* eslint-disable camelcase */
import { ACTION, STATUS } from './priv-terms.js';

// FIXME: Move this into it's own class and refine once API is fully defined
export interface PrivacyResponse {
  demand_id: string;
  date: string;
  requested_action: ACTION;
  action: ACTION;
  status?: STATUS;
  answer?: Object;
  message?: string;
  lang?: string;
  includes: PrivacyResponse[];
  system: string;
}
