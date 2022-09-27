/* eslint-disable camelcase */
import { AFTER, POLICY_TYPE } from '@blindnet/core';

export interface RetentionPolicy {
  id: string;
  policy_type: POLICY_TYPE;
  duration: string;
  after: AFTER;
}
