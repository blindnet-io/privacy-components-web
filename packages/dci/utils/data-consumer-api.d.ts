import { PendingDemandResponse } from '../models/pending-demand-response.js';
import { PendingRequestsResponse } from '../models/pending-requests-response.js';
export declare function getPendingDemands(): Promise<PendingRequestsResponse[]>;
export declare function getPendingDemand(demandId: string): Promise<PendingDemandResponse>;
export declare function approveDemand(id: string, msg: string, lang?: string): Promise<void>;
