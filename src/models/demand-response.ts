/* eslint-disable camelcase */
import { ACTION, STATUS } from './priv-terms.js';
import { PrivacyResponse } from './privacy-response.js';

export interface DemandResponse {
  demand_id: string;
  date: string;
  action: ACTION;
  status?: STATUS;
  answer?: Object;
  message?: string;
  lang?: string;
  includes: PrivacyResponse[];
}
