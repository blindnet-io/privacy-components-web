import { ACTION, DATA_CATEGORY } from './priv-terms.js';
import { Restriction } from './restriction.js';

export interface Demand {
  id?: string;
  action: ACTION;
  message?: string;
  restrictions?: Set<Restriction>;
  dataCategory?: Set<DATA_CATEGORY>;
}
