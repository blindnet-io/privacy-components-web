/* eslint-disable camelcase */
import { DEMAND_STATUS, MOTIVE, PROVENANCE, TARGET } from '@blindnet/core';

export interface Recomendation {
  id: string;
  d_id: string;
  status: DEMAND_STATUS;
  motive: MOTIVE;
  data_categories: string[];
  date_from: string;
  date_to: string;
  provenance: PROVENANCE;
  target: TARGET;
}
