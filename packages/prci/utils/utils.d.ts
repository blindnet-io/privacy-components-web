import { Demand } from '../models/demand.js';
import { ACTION } from '../models/priv-terms.js';
export declare function getDefaultActions(): ACTION[];
export declare function getDefaultDemand(action: ACTION): Demand;
export declare function getDefaultDemands(action: ACTION): Demand[];
