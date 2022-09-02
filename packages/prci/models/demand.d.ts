import { ACTION } from './priv-terms.js';
import { Restrictions } from './restrictions.js';
export interface Demand {
    id?: string;
    action: ACTION;
    message?: string;
    restrictions?: Restrictions;
}
