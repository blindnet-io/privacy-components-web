/* eslint-disable camelcase */
import { AFTER, POLICY_TYPE } from './priv-terms.js';

export interface RetentionPolicy {
  id: string;
  policy_type: POLICY_TYPE;
  duration: string;
  after: AFTER;
}
