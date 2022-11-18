import { ACTION, DEMAND_STATUS, MOTIVE } from './priv-terms.js';
export interface PrivacyResponseItem {
    demand_id: string;
    date: string;
    requested_action: ACTION;
    status: DEMAND_STATUS;
    motive?: MOTIVE;
    answer?: Object;
    message?: string;
    lang?: string;
    includes: string[];
    system: string;
    data?: string;
}
export type PrivacyResponse = PrivacyResponseItem[];
