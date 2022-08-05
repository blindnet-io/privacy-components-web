/* eslint-disable camelcase */
import { Demand } from './demand.js';
import { DataSubject } from './data-subject.js';

export interface PrivacyRequest {
  demands: Demand[];
  data_subject: DataSubject[];
}
