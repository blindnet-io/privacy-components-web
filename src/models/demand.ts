import { ACTION } from './priv-terms.js';

export interface Demand {
  action: ACTION;
  message?: string;
}
