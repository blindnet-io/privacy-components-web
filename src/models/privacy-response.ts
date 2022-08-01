/* eslint-disable camelcase */
import { DemandResponse } from './demand-response.js';

export interface PrivacyResponse {
  response_id: string;
  request_id: string;
  date: string;
  email: string;
  demand: DemandResponse[];
}
