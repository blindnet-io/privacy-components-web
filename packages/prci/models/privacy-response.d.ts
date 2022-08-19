import { ACTION, STATUS } from './priv-terms.js';
export interface PrivacyResponse {
    demand_id: string;
    date: string;
    requested_action: ACTION;
    action: ACTION;
    status?: STATUS;
    answer?: Object;
    message?: string;
    lang?: string;
    includes: PrivacyResponse[];
    system: string;
}
