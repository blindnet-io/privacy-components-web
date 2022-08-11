import { ACTION } from './priv-terms.js';
export interface DemandResponse {
    demand_id: string;
    date: string;
    requested_action: ACTION;
    status?: string;
    answer?: Object;
    message?: string;
    lang?: string;
    data?: Object;
}
export interface PrivacyResponse {
    response_id: string;
    request_id: string;
    date: string;
    demands: DemandResponse[];
}
