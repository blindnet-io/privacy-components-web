/* eslint-disable camelcase */
import { DataSubject, ACTION } from '@blindnet/core';
import { Recomendation } from './Recomendation.js';

export interface PendingDemandResponse {
  id: string;
  date: string;
  action: ACTION;
  data_subject: DataSubject;
  recommendation: Recomendation;
}
