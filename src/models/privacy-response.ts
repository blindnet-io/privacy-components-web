import { ACTION } from './priv-terms.js';

export interface PrivacyResponse {
  responseId: string;
  inResponseTo: string;
  date: string;
  system: string;
  'requested-action'?: ACTION;
  dataSubject?: string[];
  status: string;
  motive?: string[];
  answers?: string[];
  message?: string;
  lang?: string;
  includes?: PrivacyResponse[];
  data?: object[];
}
