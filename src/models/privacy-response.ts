/* eslint-disable camelcase */
import { ACTION } from './priv-terms.js';

export interface PrivacyResponse {
  response_id: string;
  request_id: string;
  date: string;
  demands: [
    {
      demand_id: string;
      date: string;
      action: ACTION;
      status?: string;
      answer?: Object;
      message?: string;
      lang?: string;
      includes?: PrivacyResponse[];
      data?: Object;
    }
  ];
}
