import { ACTION } from './priv-terms.js';
import { Restriction } from './restriction.js';

export interface Demand {
  id?: string;
  action: ACTION;
  message?: string;
  restrictions?: Restriction[];
}
