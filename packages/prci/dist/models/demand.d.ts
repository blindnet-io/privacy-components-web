import { ACTION } from './priv-terms.js';
export interface Demand {
    id?: string;
    action: ACTION;
    message?: string;
}
