import type { DemandResolution } from './DemandResolution.js';
export declare type DemandResolutionStrategy = {
    transparency: DemandResolution;
    access: DemandResolution;
    delete: DemandResolution;
    consents: DemandResolution;
};
