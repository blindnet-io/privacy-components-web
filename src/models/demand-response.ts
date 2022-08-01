/* eslint-disable camelcase */
import { ACTION } from './priv-terms.js';
import { PrivacyResponse } from './privacy-response.js';

export interface DemandResponse {
  demand_id: string;
  date: string;
  requested_action: ACTION;
  status?: string;
  answer?: Object;
  message?: string;
  lang?: string;
  includes: PrivacyResponse[];
}
