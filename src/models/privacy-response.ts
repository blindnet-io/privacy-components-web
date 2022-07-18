import { ACTION } from './priv-terms.js';

// TODO: Export open API to interface and use here

export interface PrivacyResponse {
  responseId: string;
  inResponseTo: string;
  date: string;
  system: string;
  requestedAction?: ACTION;
  dataSubject?: string[];
  status: string;
  motive?: string[];
  answers?: string[];
  message?: string;
  lang?: string;
  includes?: PrivacyResponse[];
  data?: object[];
}
