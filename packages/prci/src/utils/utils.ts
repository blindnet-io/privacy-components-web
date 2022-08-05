import { ACTION } from '../models/priv-terms.js';

export function getDefaultActions() {
  return Object.values(ACTION).filter(a => !a.includes('TRANSPARENCY.'));
}
